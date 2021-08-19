// Another way to specify connection:
// const pool = new Pool({
//   user: 'vagrant',
//   password: '123',
//   host: 'localhost',
//   database: 'bootcampx'
// });

const { Pool } = require('pg');
const pool = new Pool();

pool.connect()
  .then(() => {
    console.log('db connected');
  })
  .catch((err) => {
    console.log('db connection error:', err.stack);
  });


// ----------------------------BASIC SQL USING JS to print out the RESULT ROWS
// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `)
//   .then(res => {
//     console.log(res.rows);
//   })
//   .catch(err => console.error('query error', err.stack));

// ---------------------------- USING JS TO CONSOLE LOG with SQL
// pool.query(`
// SELECT id, name, cohort_id
// FROM students
// LIMIT 5;
// `)
// .then(res => {
//   res.rows.forEach(user => {
//     console.log(`${user.name} has an id of ${user.id} and was in the ${user.cohort_id} cohort`);
//   })
// });

// ---------------------------- CONTINUE OF THE ABOVE
// pool.query(`
// SELECT students.id as student_id, students.name as name, cohorts.name as cohort
// FROM students
// JOIN cohorts ON cohorts.id = cohort_id
// LIMIT 5;
// `)
//   .then(res => {
//     res.rows.forEach(user => {
//       console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
//     });
//   });

// ----------------------------- USING PROCESS.ARGV

const cohortName = process.argv[2]; // $1 = values[0]
const limit = process.argv[3] || 5; // $2 = values[1]
const values = [`%${cohortName}%`, limit]; // store all malicious values as an array

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values) // THIS PART IS IMPORTANT
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  }).catch(err => console.error('query error', err.stack));
