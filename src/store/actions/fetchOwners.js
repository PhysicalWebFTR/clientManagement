import {
  CHANGE_STATUS_READY,
  FETCH_OWNER,
  UPDATE
} from '../actionTypes'

export function changeStatusAction (item, menuList) {
  let index = menuList.findIndex(list => {
    return list.menuList._id === item.menuList._id
  })
  menuList[index].isReady = !item.isReady
  console.log('ini menu', menuList)
  return {
    type: CHANGE_STATUS_READY,
    payload: menuList
  }
}

export function fetchOwner (payload) {
  return {
    type: FETCH_OWNER,
    payload
  }
}

export function update (menuList) {
  let newMenu = menuList.filter(menu => {
    return menu.isReady === true
  })
  return {
    type: UPDATE,
    payload: newMenu
  }
}