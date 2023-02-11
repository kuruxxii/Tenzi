import React from "react"

export default function Dashboard(props) {
  return (
    <div className="dashboard">You rolled {props.numOfRolls} times to win</div>
  )
}