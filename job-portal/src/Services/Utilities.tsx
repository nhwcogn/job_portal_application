const formatDate = (dateString: string)=>{
    const date = new Date(dateString);
    const options = {year: 'numeric' as const, month:'short' as const};
    return date.toLocaleString('en-US', options);
} 
function timeAgo(time:string) {
    const now = new Date();
    const postDate = new Date(time);
    const diff = now.getTime() - postDate.getTime(); 

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);

    if (seconds < 60) {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (days < 30) {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else {
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    }
}
const getbase64 = (file:any) => {
        return new Promise((resolve, reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        })
    }
const formatInterviewTime=(dateStr:any)=>{
    const date = new Date(dateStr);
    const vietnamTime = new Date(date.getTime() + (7 * 60 * 60 * 1000));

    return vietnamTime.toLocaleString('en-US', {
        timeZone: 'Asia/Ho_Chi_Minh',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
function openBase64PDFInNewTab(base64String:string){
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i =0; i < byteCharacters.length; i++){
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: 'application/pdf'});
    const bolbURL = URL.createObjectURL(blob);
    window.open(bolbURL, '_blank');
}

export {formatDate, timeAgo, getbase64, formatInterviewTime, openBase64PDFInNewTab}