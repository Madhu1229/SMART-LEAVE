export const sendLeaveNotification = async (application, actionDetails, applicantEmail) => {
    try {
      const response = await fetch('http://localhost:8093/api/notifications/send-leave-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          application,
          actionDetails,
          applicantEmail
        })
      });
  
      const data = await response.json();
      return data.success;
      
    } catch (error) {
      console.error('Notification error:', error);
      return false;
    }
  };