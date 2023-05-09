import { EStatus } from "./Status.enum";

export const StatusLabels = {
  [EStatus.NEW]: "Оформлен",
  [EStatus.APPROVED]: "Подтвержден",
  [EStatus.READY]: "Собран",
  [EStatus.DELIVERED]: "Доставлен",
}