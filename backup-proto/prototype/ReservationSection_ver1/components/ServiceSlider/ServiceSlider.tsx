
interface ServiceSliderProps {
  categories: Array<any>;
  selectedCategoryId: string;
  setSelectedCategoryId: (id: string) => void;
  currentIndex: number;
  handlePrevSlide: () => void;
  handleNextSlide: () => void;
}

export default function ServiceSlider({
  categories,
  selectedCategoryId,
  setSelectedCategoryId,
  currentIndex,
  handlePrevSlide,
  handleNextSlide,
}: ServiceSliderProps) {
  return (
    <div className="reservation__serviceGrid">
      <div className="services__sliderViewport">
        <div
          className="reservation__serviceCategory"
          style={{
            transform: `translateX(-${currentIndex * (100 / categories.length)}%)`,
            width: `${categories.length * 50}%`,
            display: "flex",
            transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {categories.map((service) => (
            <button
              key={service.id}
              type="button"
              className={`services__card ${selectedCategoryId === service.id ? "active-category" : ""}`}
              onClick={() => setSelectedCategoryId(service.id)}
              style={{ width: `${100 / categories.length}%` }}
            >
              <img src={service.img} alt={service.category} className="services__img" />
              <span className="services__label">{service.category}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="services__controller">
        <div className="services__pagination">
          {categories.map((service, idx) => (
            <button
              key={`dot-${service.id}`}
              type="button"
              className={`services__dot ${selectedCategoryId === service.id ? "active-dot" : ""}`}
              onClick={() => setSelectedCategoryId(service.id)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
        <div className="services__navBtnWrapper">
          <button type="button" className="services__navBtn" onClick={handlePrevSlide} aria-label="Prev">
            ‹
          </button>
          <button type="button" className="services__navBtn" onClick={handleNextSlide} aria-label="Next">
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
