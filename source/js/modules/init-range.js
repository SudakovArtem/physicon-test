import noUiSlider from 'nouislider';
import wNumb from "wnumb";

const purchaseSlider = document.querySelector('.js-slider-deviation');
const weightSlider = document.querySelector('.js-slider-weight');
const rigiditySlider = document.querySelector('.js-slider-rigidity');

const initRange = () => {

  // инициализация слайдера изменения первоначального отклонения от равновесия
  if (purchaseSlider) {
    window.deviationSlider = noUiSlider.create(purchaseSlider, {
      start: [+purchaseSlider.dataset.startValue],
      connect: [true, false],
      padding: 0,
      range: {
        min: +purchaseSlider.dataset.minValue,
        max: +purchaseSlider.dataset.maxValue,
      },
      step: parseInt(purchaseSlider.dataset.step, 10),
      format: wNumb({
        decimals: parseInt(purchaseSlider.dataset.decimals, 10),
        thousand: ' ',
        suffix: purchaseSlider.dataset.suffix,
      }),
    });
  }

  // инициализация слайдера изменения массы
  if (weightSlider) {
    window.weightSlider = noUiSlider.create(weightSlider, {
      start: [+weightSlider.dataset.startValue],
      connect: [true, false],
      padding: 0,
      range: {
        min: +weightSlider.dataset.minValue,
        max: +weightSlider.dataset.maxValue,
      },
      step: parseInt(weightSlider.dataset.step, 10),
      format: wNumb({
        decimals: parseInt(weightSlider.dataset.decimals, 10),
        thousand: ' ',
        suffix: weightSlider.dataset.suffix,
      }),
    });
  }

  // инициализация слайдера изменения жесткости
  if (rigiditySlider) {
    window.rigiditySlider = noUiSlider.create(rigiditySlider, {
      start: [+rigiditySlider.dataset.startValue],
      connect: [true, false],
      padding: 0,
      range: {
        min: +rigiditySlider.dataset.minValue,
        max: +rigiditySlider.dataset.maxValue,
      },
      step: parseInt(rigiditySlider.dataset.step, 10),
      format: wNumb({
        decimals: parseInt(rigiditySlider.dataset.decimals, 10),
        thousand: ' ',
        suffix: rigiditySlider.dataset.suffix,
      }),
    });
  }
};

export {initRange};
