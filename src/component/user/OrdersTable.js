// OrdersTable.js

import React from 'react';

function OrdersTable({ orders }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Original Price</th>
          <th>Payment Method</th>
          <th>Address Line 1</th>
          <th>Phone Number</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order.id}>
            <td>{order.product}</td>
            <td>{order.quantity}</td>
            <td>{order.orginal_price}</td>
            <td>{order.payment_method}</td>
            <td>{order.address.address_line1}</td>
            <td>{order.address.phone_number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default OrdersTable;
