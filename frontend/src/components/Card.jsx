import React from "react";

function Card() {
  return (
    <div className="border border-gray-300 rounded-2xl p-6 w-[350px] flex gap-4 flex-col  ">
      <img
        src="https://m.media-amazon.com/images/I/51NwMqEnC3L._UF1000,1000_QL80_.jpg"
        alt="Image of civic issue"
        className="w-[350px] h-[120px] object-cover rounded-t-lg"
      />
      <div className="flex justify-between items-center">
        <span className="bg-amber-300 px-3 py-1 rounded-full">StreetLight</span>
        <span className="text-red-600">In Progress</span>
        <span> 14 march</span>
      </div>
      <div>
        <div className="flex items-center gap-2 text-xl font-semibold">
          <span className="w-[13px] h-[13px] bg-amber-400 rounded-full"></span>
          <span>Streetlight not working</span>
        </div>

        <p>street light not working since two days</p>
      </div>
      <div>
        <p className="text-center">j.k. road , Bhopal</p>
      </div>
    </div>
  );
}
export default Card;
