const Loading = () => (
  <div style={{ display: 'grid', placeItems: 'center', height: '100vh' }}>
    <style>{`@keyframes s {to{transform:rotate(360deg)}}`}</style>
    <div
      style={{
        width: '60px',
        height: '60px',
        border: '6px solid #eee',
        borderTopColor: '#007bff',
        borderRadius: '50%',
        animation: 's .8s infinite linear',
      }}
    />
  </div>
);

export default Loading;
