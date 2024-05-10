import './qrCode.scss';
import { QRCodeCanvas } from 'qrcode.react';
import GetAppIcon from '@mui/icons-material/GetApp';
import { useEffect } from 'react';
const QrCode = ({ studentID, stName }) => {
  useEffect(() => {
    return () => {
      const existingLink = document.getElementById('downloadLink');
      if (existingLink) {
        document.body.removeChild(existingLink);
      }
    };
  }, []);
  const downloadQRCode = () => {
    const canvas = document.querySelector('canvas');
    const url = canvas.toDataURL();
    const link = document.createElement('a');
    link.href = url;
    link.download = `st_${stName}${studentID}.png`;
    link.id = 'downloadLink';
    document.body.appendChild(link);
    link.click();
  };
  console.log('studentID QrCode', studentID);
  return (
    <div className="qrCode">
      <div className="leftT">
        <QRCodeCanvas
          value={`${studentID}`}
          size={200}
          bgColor={'#ffffff'}
          fgColor={'#1976d2'}
          level={'H'}
          includeMargin={false}
        />
        <div className="rightT">
          <button onClick={downloadQRCode}>
            <GetAppIcon />
            Download QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
