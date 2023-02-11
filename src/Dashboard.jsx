import React from "react"

export default function Dashboard(props) {
  return (
    <div className="dashboard">You rolled {props.numOfRolls} times in {props.duration} seconds to win</div>
  )
}