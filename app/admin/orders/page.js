"use client";

import React, { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (data.sessions) setOrders(data.sessions);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ color: '#10b981', marginBottom: '20px' }}>K & K Halal Mart - Customer Orders</h1>
      <p style={{ marginBottom: '20px', color: '#555' }}>तपाईंको स्टोरमा आएका पछिल्ला अर्डरहरूको सूची:</p>

      {loading ? (
        <p>अर्डरहरू लोड हुँदैछ...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ background: '#f3f4f6', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '12px' }}>मिति</th>
              <th style={{ padding: '12px' }}>ग्राहकको इमेल</th>
              <th style={{ padding: '12px' }}>रकम (JPY)</th>
              <th style={{ padding: '12px' }}>स्ट्याटस</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ padding: '15px', textAlign: 'center', color: '#777' }}>
                  अहिलेसम्म कुनै अर्डर देखिएको छैन।
                </td>
              </tr>
            ) : (
              orders.map((session) => (
                <tr key={session.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>
                    {new Date(session.created * 1000).toLocaleDateString()}
                  </td>
                  <td style={{ padding: '12px' }}>{session.customer_details?.email || 'N/A'}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: '#10b981' }}>
                    ¥{session.amount_total?.toLocaleString()}
                  </td>
                  <td style={{ padding: '12px', color: session.payment_status === 'paid' ? 'green' : 'orange' }}>
                    {session.payment_status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}