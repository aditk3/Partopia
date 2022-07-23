import jwt_decode from "jwt-decode";

//used by homepage to render months
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const formatField = (field) => {
    return field.charAt(0).toUpperCase() + field.substring(1,field.length); 
  }

const checkStateFields = (state) => {
    return Object.values(state).every(value => {
       return value.trim() ? true : false;
    })
  }

const parseDate = (date) => {
  const d = new Date(date.replaceAll('-',' '));
  return `${monthNames[d.getMonth()]} ${d.getDate()}`;
}

const getUserId = () => {
  const token = sessionStorage.getItem('token');
  return token ? jwt_decode(token).id : 0;
}

export {formatField, checkStateFields, parseDate, getUserId}
