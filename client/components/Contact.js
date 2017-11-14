import React from 'react'

const Contact = ({name, image, info, tel, telegram,
  toggleCard, removeContact, toggleEditForm}) => (
  <div className="contact" data-name={name}>
    <div className="header">
      <p data-name={name} onClick={toggleCard}>{name}</p>

      <button className="edit" data-name={name} onClick={toggleEditForm}>
        <i className="fa fa-pencil"></i>
      </button>
      <button className="remove" data-name={name} onClick={removeContact}>
        <i className="fa fa-trash-o"></i>
      </button>
    </div>

    <div className="card hidden">
      <img src={`client/img/${image}`} alt="<img/>" />
      <p>{info}</p>
      <p>
        <label htmlFor="tel"><i className="fa fa-phone"></i></label>
        {tel}
      </p>
      <p>
        <label htmlFor="tel"><i className="fa fa-paper-plane-o"></i></label>
        {telegram}
      </p>
    </div>
  </div>  /* .contact */
)



export default Contact