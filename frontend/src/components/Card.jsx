import React from "react";

function Card({
  title,
  address,
  category,
  status,
  description,
  postImage,
  createdAt,
}) {
  const formattedDate = new Date(createdAt).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  return (
    <div className="border border-gray-300 rounded-2xl p-6 w-[350px] flex gap-4 flex-col  ">
      <img
        src={postImage}
        alt="Image of civic issue"
        className="w-[350px] h-[120px] object-cover rounded-t-lg"
      />
      <div className="flex justify-between items-center">
        <span className="bg-amber-300 px-3 py-1 rounded-full">{category}</span>
        <span className="text-red-600">{status}</span>
        <span> {formattedDate}</span>
      </div>
      <div>
        <div className="flex items-center gap-2 text-xl font-semibold">
          <span className="w-[13px] h-[13px] bg-amber-400 rounded-full"></span>
          <span>{title}</span>
        </div>

        <p className="text-gray-700 text-sm truncate">{description}</p>
      </div>
      <div>
        <p className="text-end">{address}</p>
      </div>
    </div>
  );
}
export default Card;

// import React from "react";

// function Card({
//   title,
//   address,
//   category,
//   status,
//   description,
//   postImage,
//   createdAt,
// }) {
//   const formattedDate = new Date(createdAt).toLocaleString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <div className="border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden w-[350px] flex flex-col">
//       {/* Image Section */}
//       <img
//         src={postImage}
//         alt="Civic issue"
//         className="w-full h-[180px] object-cover rounded-t-2xl"
//       />

//       {/* Content Section */}
//       <div className="p-5 flex flex-col gap-3">
//         {/* Tags Row */}
//         <div className="flex justify-between items-center text-sm">
//           <span className="bg-amber-300 text-gray-800 px-3 py-1 rounded-full font-medium">
//             {category}
//           </span>
//           <span
//             className={`font-semibold ${
//               status === "resolved"
//                 ? "text-green-600"
//                 : status === "in progress"
//                 ? "text-blue-500"
//                 : "text-red-500"
//             }`}
//           >
//             {status}
//           </span>
//           <span className="text-gray-500 text-sm">{formattedDate}</span>
//         </div>

//         {/* Title & Description */}
//         <div>
//           <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
//             <span className="w-[10px] h-[10px] bg-amber-400 rounded-full"></span>
//             <h2>{title}</h2>
//           </div>
//           <p className="text-gray-600 text-sm mt-1 line-clamp-3">
//             {description}
//           </p>
//         </div>

//         {/* Address */}
//         <div className="mt-auto text-right">
//           <p className="text-gray-500 text-sm italic">{address}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;
