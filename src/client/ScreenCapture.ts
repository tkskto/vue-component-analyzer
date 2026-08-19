import {customDialog} from './dialog';
import {styleGetter} from './style';
import {encodeBase64} from './common';

const createSearchQueryElement = (query: string): HTMLParagraphElement => {
  const element = document.createElement('p');

  element.className = 'capture-search-query';
  element.textContent = `Filtered by: "${query}"`;

  return element;
};

/**
 * generate Image Element from uri string
 * @param url
 */
export const makeImage = (url: string): Promise<HTMLImageElement> => (
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.addEventListener('error', reject);
    img.src = url;
  })
);

/**
 * generate SVG DOM String from DOM Element
 * @param app
 * @param width
 * @param height
 */
export const makeSVG = async (app: HTMLDivElement, width: number, height: number, searchQuery = ''): Promise<string> => {
  const clone = app.cloneNode(true) as HTMLDivElement;

  if (searchQuery) {
    clone.prepend(createSearchQueryElement(searchQuery));
  }

  const willRemoveElements = clone.querySelectorAll<HTMLImageElement>('img, script, svg');

  willRemoveElements.forEach((element) => {
    if (element.parentElement) {
      element.parentElement.removeChild(element);
    }
  });

  const style = await styleGetter.getCurrentStyleText();

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">` +
    `<foreignObject width="${width}" height="${height}" requiredExtensions="http://www.w3.org/1999/xhtml">` +
    `<body xmlns="http://www.w3.org/1999/xhtml"><style>${style}</style>${clone.outerHTML}</body>` +
    '</foreignObject></svg>';
};

/**
 * generate png image from blob Image
 * @param image
 * @param width
 * @param height
 */
export const svgToPng = async (image: HTMLImageElement, width: number, height: number): Promise<HTMLImageElement> => {
  const canvas: HTMLCanvasElement = document.createElement('canvas');

  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');

  if (context) {
    context.drawImage(image, 0, 0);
  }

  const dataUrl = canvas.toDataURL('image/png', 100);
  const pngImage = await makeImage(dataUrl);

  return pngImage;
};

/**
 * capture screen image
 */
export const capture = async (): Promise<HTMLImageElement> => {
  const app = document.querySelector<HTMLDivElement>('.root.html');

  if (app) {
    const searchQuery = document.querySelector<HTMLInputElement>('#search-file-name')?.value.trim() ?? '';
    let width = app.scrollWidth;
    let height = app.scrollHeight;

    if (searchQuery) {
      const queryElement = createSearchQueryElement(searchQuery);

      queryElement.style.position = 'absolute';
      queryElement.style.visibility = 'hidden';
      document.body.appendChild(queryElement);

      width = Math.max(width, queryElement.scrollWidth + 36);
      height += queryElement.scrollHeight + 12;

      queryElement.remove();
    }

    const svgString = await makeSVG(app, width, height, searchQuery);
    const svgImage = await makeImage(`data:image/svg+xml;base64,${encodeBase64(svgString)}`);
    const pngImage = await svgToPng(svgImage, width, height);

    return pngImage;
  }

  return new Image();
};

/**
 * set capture event
 */
export const setScreenCapture = function (): void {
  const btnCapture: HTMLButtonElement | null = document.querySelector<HTMLButtonElement>('#btn-capture');

  if (btnCapture) {
    btnCapture.addEventListener('click', async () => {
      try {
        customDialog.load();

        const img = await capture();

        await customDialog.showExportDialog(img);
      } catch (err) {
        console.error(err);
      }
    });
  }
};
