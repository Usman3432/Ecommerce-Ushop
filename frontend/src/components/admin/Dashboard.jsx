import React from 'react'
import AdminLayout from '../layouts/AdminLayout'

const Dashboard = () => {
  return (
    <AdminLayout>
    <div className="d-flex justify-content-start align-items-center">
      <div className="mb-3 me-4">
        <label className="form-label d-block">Start Date</label>
        <input type="date" className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label d-block">End Date</label>
        <input type="date" className="form-control" />
      </div>
      <button className="btn fetch-btn ms-4 mt-3 px-5">Fetch</button>
    </div>

    <div className="row pr-4 my-5">
      <div className="col-xl-6 col-sm-12 mb-3">
        <div className="card text-white bg-success o-hidden h-100">
          <div className="card-body">
            <div className="text-center card-font-size">
              Sales
              <br />
              <b>$0.00</b>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-6 col-sm-12 mb-3">
        <div className="card text-white bg-danger o-hidden h-100">
          <div className="card-body">
            <div className="text-center card-font-size">
              Orders
              <br />
              <b>0</b>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="mb-5"></div>
    </AdminLayout>
  )
}

export default Dashboard
