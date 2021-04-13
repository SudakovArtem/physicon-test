import noUiSlider from 'nouislider';
import wNumb from "wnumb";

const purchaseSlider = document.querySelector('.js-slider-deviation');
const weightSlider = document.querySelector('.js-slider-weight');
const rigiditySlider = document.querySelector('.js-slider-rigidity');

const initPurchaseRange = () => {
  const deviationInput = document.querySelector(`#${purchaseSlider.dataset.input}`);

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

  // function setListeners(slider, input) {
  //   if (slider && input) {
  //     slider.on('update', (values, handle) => {
  //       input.value = values[handle];
  //     });
  //
  //     slider.on('set', () => {
  //       const form = input.closest('form');
  //       if (form) {
  //         const formChangeEv = new CustomEvent('change');
  //         const formInputEv = new CustomEvent('input');
  //         form.dispatchEvent(formChangeEv);
  //         form.dispatchEvent(formInputEv);
  //       }
  //     });
  //
  //     input.addEventListener('focus', () => {
  //       if (input.value === '0') {
  //         input.value = '';
  //       }
  //     });
  //
  //     input.addEventListener('blur', () => {
  //       if (input.value === '') {
  //         input.value = '0';
  //       }
  //     });
  //
  //     input.addEventListener('input', function () {
  //       slider.noUiSlider.set([this.value, null]);
  //     });
  //   }
  // }

  // setListeners(window.deviationSlider, deviationInput);
};

export {initPurchaseRange};
