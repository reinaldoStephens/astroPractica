import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CircleDotIcon, CircleIcon } from "../components/Icons.jsx";

export function ImageSlider({ images }) {
    const [imageIndex, setImageIndex] = useState(0);

    const showPrevImage = () => {
        setImageIndex((index) => {
            if (index === 0) return images.length - 1;
            return index - 1;
        });
    };

    const showNextImage = () => {
        setImageIndex((index) => {
            if (index === images.length - 1) return 0;
            return index + 1;
        });
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        e.target.style.cursor = "grabbing";
    };

    const handleMouseUp = (e) => {
        const imgWidth = e.target.width;
        let index = 0;

        if (e.pageX > imgWidth / 2) {
            index = imageIndex === images.length - 1 ? 0 : imageIndex + 1;
        } else {
            index = imageIndex == 0 ? images.length - 1 : imageIndex - 1;
        }

        e.target.style.cursor = "grab";

        setImageIndex(index);
    };

    return (
        <article className="img-slider-container" aria-label="Image Slider">
            <a href="#after-image-slider-controls" className="skip-link" rel="noopener noreferrer">
                Skip image slider controls
            </a>
            <div className="img-container" onMouseUp={handleMouseUp} onMouseDown={handleMouseDown} onTouchEnd={handleMouseUp}>
                {images.map(({ url, alt }, index) => (
                    <img
                        key={url}
                        src={url}
                        alt={alt}
                        aria-hidden={imageIndex !== index}
                        className="img-slider-img"
                        style={{
                            translate: `${-100 * imageIndex}%`,
                        }}
                        data-img-index={index}
                        loading="lazy"
                        decoding="async"
                    ></img>
                ))}
            </div>
            <button onClick={showPrevImage} className="img-slider-btn left" aria-label="View Previous Image">
                <ArrowLeftIcon aria-hidden></ArrowLeftIcon>
            </button>
            <button onClick={showNextImage} className="img-slider-btn rigth" aria-label="View Next Image">
                <ArrowRightIcon aria-hidden></ArrowRightIcon>
            </button>
            <div className="img-slider-pagination">
                {images.map(({ alt }, index) => (
                    <button
                        className="img-slider-dot-btn"
                        key={index}
                        onClick={() => setImageIndex(index)}
                        aria-label={`View ${alt} Image`}
                    >
                        {index === imageIndex ? (
                            <CircleDotIcon aria-hidden></CircleDotIcon>
                        ) : (
                            <CircleIcon aria-hidden></CircleIcon>
                        )}
                    </button>
                ))}
            </div>

            <div id="after-image-slider-controls"></div>
        </article>
    );
}
