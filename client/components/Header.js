import React from 'react'

const Header = ({addContact, loadSamples, removeContact, toggleSearchBox,
  toggleAddForm, updateSearchQuery}) => (
  <header>
    <h1>Контакты | Contacts</h1>
    <div className="btns-bar"> {/* Buttons Bar */}
      <button className="search-box" onClick={toggleSearchBox}>
        <i className="fa fa-search"></i>
      </button>
      <button className="populate-list" onClick={loadSamples}>
        <i className="fa fa-users"></i>
        <i className="fa fa-plus"></i>
      </button>
      <button className="add-contact" onClick={toggleAddForm}>
        <i className="fa fa-user-plus"></i>
      </button>
      <button className="pull-contacts">
        <i className="fa fa-cloud-download"></i>
      </button>
      <button className="push-contacts">
        <i className="fa fa-cloud-upload"></i>
      </button>
    </div>


    <form className="search-bar hidden"
      onChange={
        () => {
          const searchQuery = document.querySelector('.search-bar input[name="query"]').value;
          console.log({searchQuery})
          updateSearchQuery(searchQuery);
        }
      }
    > {/* Search Form */}
      <input type="text" name="query" placeholder="Введите строку поиска"/>
    </form>


    <form className="add-contact hidden" onSubmit={addContact}  > {/* Add Contact Form */}
      <p>
        <label htmlFor="name"><i className="fa fa-user"></i></label>
        <input className="form-control" type="text" name="name" defaultValue="Антон Логвинов" />
      </p>
      <p>
        <label htmlFor="image"><i className="fa fa-file-image-o"></i></label>
        <textarea name="image" defaultValue="../img/man.svg" cols="30"></textarea>
      </p>
      <p>
        <label htmlFor="info"><i className="fa fa-info"></i></label>
        <textarea name="info" defaultValue="Вин Дизель среди обзорщиков" cols="30"></textarea>
      </p>
      <p>
        <label htmlFor="tel"><i className="fa fa-phone"></i></label>
        <input className="form-control" type="tel" name="tel" defaultValue="1010" />
      </p>
      <p>
        <label htmlFor="telegram"><i className="fa fa-paper-plane-o"></i></label>
        <input className="form-control" type="text" name="telegram" defaultValue="toha10iz10" />
      </p>
      <button type="submit">
        <i className="fa fa-floppy-o"></i> Сохранить
      </button>
    </form>

  </header>
)

export default Header