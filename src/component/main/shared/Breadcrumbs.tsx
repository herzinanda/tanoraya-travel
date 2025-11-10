import React from 'react'

const Breadcrumbs = () => {
  return (
    <>
        <section className="breadcrumb-wrapper fix bg-cover"
        style={{ backgroundImage: "url(/img/breadcrumb/breadcrumb.jpg)" }}>
        <div className="container">
            <div className="row">
                <div className="page-heading">
                    <h2>Contact Us</h2>
                    <ul className="breadcrumb-list">
                        <li>
                            <a href="index.html">Home</a>
                        </li>
                        <li><i className="fa-solid fa-chevrons-right"></i></li>
                        <li className="active">Contact Us</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}

export default Breadcrumbs