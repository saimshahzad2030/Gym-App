import { NavLink } from "react-router-dom"
import { DropDownMenuType } from "../../types/DropDownMenu"
import React from "react"
import { Add, View } from "../../../constants/icons"

 
const DropDownMenu:React.FC<DropDownMenuType> = ({viewsUrl,addUrl,open}) => {
  return (
    <div
    className={`translate transform overflow-hidden ${
      !open && 'hidden'
    }`}
  >
    <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                          <li>
                            <NavLink
                              to={viewsUrl}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <View/>
                              View
                            </NavLink>
                          </li>
                       
                          <li>
                            <NavLink
                              to={addUrl}
                              className={({ isActive }) =>
                                'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                (isActive && '!text-white')
                              }
                            >
                              <Add/>
                              Add
                            </NavLink>
                          </li>
                        </ul>
                        </div> 
  )
}

export default DropDownMenu