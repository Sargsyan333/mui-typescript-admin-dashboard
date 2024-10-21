export const isAnimatedGif = (imageData: string): boolean => {
  const base64 = imageData.substr(imageData.indexOf(',') + 1);
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  const buffer = bytes.buffer;

  const HEADER_LEN = 6; // offset bytes for the header section
  const LOGICAL_SCREEN_DESC_LEN = 7; // offset bytes for logical screen description section

  // Start from last 4 bytes of the Logical Screen Descriptor
  const dv = new DataView(buffer, HEADER_LEN + LOGICAL_SCREEN_DESC_LEN - 3);
  let offset = 0;
  const globalColorTable = dv.getUint8(0);// aka packet byte
  let globalColorTableSize = 0;

  // check first bit, if 0, then we don't have a Global Color Table
  // eslint-disable-next-line no-bitwise
  if (globalColorTable & 0x80) {
    // grab the last 3 bits, to calculate the global color table size -> RGB * 2^(N+1)
    // N is the value in the last 3 bits.
    // eslint-disable-next-line no-bitwise
    globalColorTableSize = 3 * (2 ** ((globalColorTable & 0x7) + 1));
  }

  // move on to the Graphics Control Extension
  offset = 3 + globalColorTableSize;

  const extensionIntroducer = dv.getUint8(offset);
  const graphicsConrolLabel = dv.getUint8(offset + 1);
  let delayTime = 0;

  // Graphics Control Extension section is where GIF animation data is stored
  // First 2 bytes must be 0x21 and 0xF9
  // eslint-disable-next-line no-bitwise
  if ((extensionIntroducer & 0x21) && (graphicsConrolLabel & 0xF9)) {
    // skip to the 2 bytes with the delay time
    delayTime = dv.getUint16(offset + 4);
  }

  return delayTime > 0;
};
