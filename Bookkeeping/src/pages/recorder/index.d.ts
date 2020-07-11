export interface recorderTypeArrType {
  item: itemType[]
}
export interface itemType {
  id: number,
  name: string,
  click: boolean,
}
interface ImageDataType {
  item: ImageItem[],
}
export interface ImageItem {
  url: string,
  httpurl: string
}
export interface ContractorArrType {
  item: itemType[]
}
export interface BorrowingType {
  item: itemType[]
}