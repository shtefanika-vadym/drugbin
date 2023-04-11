export interface INavigation {
  route: string
  title: string
}

export enum PathsEnum {
  home = '/home',
  history = '/history',
  documents = '/documents',
  donations = '/donations',
  create = '/create-new',
}

export const NAVIGATION_ITEMS: INavigation[] = [
  {
    route: PathsEnum.home,
    title: 'Home',
  },
  {
    route: PathsEnum.history,
    title: 'History',
  },
  {
    route: PathsEnum.documents,
    title: 'Documents',
  },
  {
    route: PathsEnum.donations,
    title: 'Donation',
  },
]

export const NAVIGATION_ITEMS_RECYCLE: INavigation[] = [
  {
    route: PathsEnum.home,
    title: 'Home',
  },
]
