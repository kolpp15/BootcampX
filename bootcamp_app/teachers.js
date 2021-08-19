const { Pool } = require('pg');
const pool = new Pool();

pool.connect()
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log('db connection error:', err.stack);
  });


const cohortName = process.argv[2]; // $1 = values[0]
const values = [`%${cohortName}%`]; // store all potential malicious values in an array

pool.query(`
SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
ORDER BY teacher;
`, values)
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.cohort}: ${user.teacher}`);
    });
  }).catch(err => console.error('query error', err.stack));
