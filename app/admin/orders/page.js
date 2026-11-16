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
    <div style={{ padding: '30px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#10b981', marginBottom: '10px' }}>K & K Halal Mart - Customer Orders</h1>
      <p style={{ marginBottom: '20px', color: '#555' }}>तपाईंको स्टोरमा आएका अर्डर र डेलिभरी ठेगानाहरू:</p>

      {loading ? (
        <p>अर्डरहरू लोड हुँदैछ...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <thead>
              <tr style={{ background: '#f3f4f6', textAlign: 'left', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px' }}>मिति</th>
                <th style={{ padding: '12px' }}>ग्राहक र फोन</th>
                <th style={{ padding: '12px' }}>डेलिभरी ठेगाना</th>
                <th style={{ padding: '12px' }}>रकम (JPY)</th>
                <th style={{ padding: '12px' }}>स्ट्याटस</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '15px', textAlign: 'center', color: '#777' }}>
                    अहिलेसम्म कुनै अर्डर देखिएको छैन।
                  </td>
                </tr>
              ) : (
                orders.map((session) => {
                  const addr = session.shipping_details?.address || session.customer_details?.address;
                  const fullAddress = addr
                    ? 〒${addr.postal_code || ''} ${addr.state || ''} ${addr.city || ''} ${addr.line1 || ''} ${addr.line2 || ''}
                    : 'ठेगाना उपलब्ध छैन';

                  return (
                    <tr key={session.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '12px' }}>
                        {new Date(session.created * 1000).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '12px' }}>
                        <strong>{session.shipping_details?.name || session.customer_details?.name || 'Guest'}</strong>
                        <br />
                        <span style={{ fontSize: '13px', color: '#555' }}>
                          📞 {session.customer_details?.phone || 'N/A'}
                        </span>
                        <br />
                        <span style={{ fontSize: '12px', color: '#777' }}>
                          ✉️ {session.customer_details?.email || 'N/A'}
                        </span>
                      </td>
                      <td style={{ padding: '12px', fontSize: '14px', maxWidth: '300px' }}>
                        {fullAddress}
                      </td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: '#10b981' }}>
                        ¥{session.amount_total?.toLocaleString()}
                      </td>
                      <td style={{ padding: '12px', fontWeight: 'bold', color: session.payment_status === 'paid' ? 'green' : 'orange' }}>
                        {session.payment_status.toUpperCase()}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}