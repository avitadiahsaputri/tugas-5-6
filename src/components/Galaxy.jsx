// import React from 'react'

export default function Galaxy({id, name, diameter}) {
  return (
    <div className="Card">
      <h3>
        ({id}) {name}
      </h3>
      <div>Diameter: {diameter.toLocaleString("id-ID")}</div>
      <div className="CardAction"></div>
    </div>
  );
}


