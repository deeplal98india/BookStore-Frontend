import React from "react";

function Cards({ item }) {
  const price = Number(item?.price ?? 0);

  return (
    <div className="my-3 mt-4 p-3">
      <div className="card w-full overflow-hidden border border-slate-200 bg-white text-slate-900 shadow-xl transition duration-200 hover:scale-[1.02] dark:border-slate-700 dark:bg-slate-900 dark:text-white">
        {/* Book Image */}
        <figure className="h-52 overflow-hidden bg-slate-100 dark:bg-slate-800">
          <img
            src={item?.image}
            alt={item?.name || "Book cover"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </figure>

        {/* Book Details */}
        <div className="card-body p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h2 className="card-title text-lg font-semibold">
              {item?.name || "Untitled Book"}
            </h2>

            {item?.category && (
              <span className="badge badge-secondary">
                {item.category}
              </span>
            )}
          </div>

          <p className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-slate-600 dark:text-slate-300">
            {item?.title || "Explore this book and discover something new."}
          </p>

          {/* Price and Action */}
          <div className="card-actions mt-3 items-center justify-between">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              ₹{price.toLocaleString("en-IN")}
            </span>

            <button
              type="button"
              onClick={() => {
                alert(`You selected: ${item?.name || "this book"}`);
              }}
              className="cursor-pointer rounded-full border-2 border-pink-500 px-4 py-2 text-sm font-semibold transition duration-200 hover:bg-pink-500 hover:text-white"
            >
              View Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
