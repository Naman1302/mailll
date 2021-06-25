let id = 0;
const createData = (Serial_no, date, email,subject) => {
  id += 1;
  return { id,Serial_no, date, email,subject};
};

export default [
  createData(
    1,
    "17-8-2021",
    "nehal.c22@gmail.com",
    "important",
    
  ),
  createData(
    2,
    "17-8-2021",
    "nehal.c222@gmail.com",
    "importantttt",
  ),
  createData(
    3,
    "27-8-2021",
    "nehal.c22@gmail.com",
    "important",
  ),
  createData(
    4,
    "17-8-2021",
    "nehal.c22@gmail.com",
    "important",
  ),
  createData(
    5,
    "17-8-2021",
    "nehal.c22@gmail.com",
    "important",
  )
];
