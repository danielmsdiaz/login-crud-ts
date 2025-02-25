import React from 'react';

const PreviewRating = () => {
    return (
        <div className="rating rating-md md:rating-lg rating-half">
            <input type="radio" name="rating-10" className="rating-hidden cursor-default" disabled />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-indigo-500 cursor-default" disabled />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-indigo-500 cursor-default" disabled />
            <input
                type="radio"
                name="rating-10"
                className="mask mask-star-2 mask-half-1 bg-indigo-500 cursor-default"
                defaultChecked
                disabled
            />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-indigo-500 cursor-default" disabled />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-indigo-500 cursor-default" disabled />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-indigo-500 cursor-default" disabled />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-indigo-500 cursor-default" disabled />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-indigo-500 cursor-default" disabled />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-1 bg-indigo-500 cursor-default" disabled />
            <input type="radio" name="rating-10" className="mask mask-star-2 mask-half-2 bg-indigo-500 cursor-default" disabled />
        </div>
    );
};

export default PreviewRating;
