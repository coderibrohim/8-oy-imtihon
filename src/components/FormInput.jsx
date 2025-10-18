// import React from 'react'

// function FormInput({label, type, name}) {
//   return (
//     <div>
//         <label htmlFor={label}></label>
//       <input type={type} name={name} />
//     </div>
//   )
// }

// export default FormInput



import React from "react";

function FormInput({ label, type, name }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        
      />
    </div>
  );
}

export default FormInput;

