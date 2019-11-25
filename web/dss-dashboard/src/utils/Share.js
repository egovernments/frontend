import S3 from 'react-s3';
import jsPDF from 'jspdf'
import domtoimage from 'dom-to-image';
const pdf = new jsPDF("p", "mm", "a1");
pdf.scaleFactor = 3;

export const handlePdfShareEmail = () => {
    var ts = Math.round((new Date()).getTime() / 1000);

    let div = document.getElementById('divToShare');
    domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
        .then(function (dataUrl) {
            pdf.addImage(dataUrl, 'JPG', 100, 10);
            var blobData = new Blob([pdf.output('blob')], { type: 'application/pdf' })

            const config = {
                bucketName: 'dss-project-bucket',
                region: 'ap-south-1',
                accessKeyId: 'AKIAUAXLRTC3KF53ZRH5',
                secretAccessKey: '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',
                ACL: "public-read"
            }
            blobData.name = "dss" + ts + ".pdf"
            S3
                .uploadFile(blobData, config)
                .then(data => {
                    var fakeLink = document.createElement('a');
                    fakeLink.setAttribute('href', 'mailto:?body=' + encodeURIComponent(data.location));
                    fakeLink.click();
                })
                .catch(err => console.error(err))
        }.bind(this))
}

export const handleImageShareEmail = () => {
    var ts = Math.round((new Date()).getTime() / 1000);

    let div = document.getElementById('divToShare');
    domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
        .then(function (dataUrl) {
            var blobData = dataURItoBlob(dataUrl);
            const config = {
                bucketName: 'dss-project-bucket',
                region: 'ap-south-1',
                accessKeyId: 'AKIAUAXLRTC3KF53ZRH5',
                secretAccessKey: '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',
                ACL: "public-read"
            }
            blobData.name = "dss" + ts + ".jpeg"
            S3
                .uploadFile(blobData, config)
                .then(data => {
                    var fakeLink = document.createElement('a');
                    fakeLink.setAttribute('href', 'mailto:?body=' + encodeURIComponent(data.location));
                    fakeLink.click();
                })
                .catch(err => console.error(err))
        }.bind(this))

    // html2canvas(document.getElementById('divToShare'), {
    //     allowTaint: true, useCORS: true,
    //     backgroundColor: "white",
    //     removeContainer: true,
    //     scrollX: -180,
    //     x: 0, y: 0, width: 2383.94, height: 3370.39, windowWidth: 2383, windowHeight: 1400
    // }).then(canvas => {
    //     var a = document.createElement('a');
    //     var dataUrl = canvas.toDataURL("image/jpeg");
    //     var blobData = dataURItoBlob(dataUrl);
    //     const config = {
    //         bucketName: 'dss-project-bucket',
    //         region: 'ap-south-1',
    //         accessKeyId: 'AKIAUAXLRTC3KF53ZRH5',
    //         secretAccessKey: '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',
    //         key: "/test",
    //     }
    //     blobData.name = "dss" + ts + ".jpeg"
    //     S3
    //         .uploadFile(blobData, config)
    //         .then(data => {
    //             var fakeLink = document.createElement('a');
    //             fakeLink.setAttribute('href', 'mailto:?body=' + encodeURIComponent(data.location));
    //             fakeLink.click();
    //         })
    //         .catch(err => console.error(err))

    // })
}

export const handleWhatsAppImageShare = () => {
    var ts = Math.round((new Date()).getTime() / 1000);

    let div = document.getElementById('divToShare');
    domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
        .then(function (dataUrl) {
            var blobData = dataURItoBlob(dataUrl);
            const config = {
                bucketName: 'dss-project-bucket',
                region: 'ap-south-1',
                accessKeyId: 'AKIAUAXLRTC3KF53ZRH5',
                secretAccessKey: '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',
                ACL: "public-read"
            }
            blobData.name = "dss" + ts + ".jpeg"
            S3
                .uploadFile(blobData, config)
                .then(data => {
                    var fakeLink = document.createElement('a');
                    fakeLink.setAttribute('href', 'https://' + (isMobileOrTablet() ? 'api' : 'web') + '.whatsapp.com/send?text=' + encodeURIComponent(data.location));
                    fakeLink.setAttribute('data-action', 'share/whatsapp/share');
                    fakeLink.setAttribute('target', '_blank');
                    fakeLink.click();
                })
                .catch(err => console.error(err))
        }.bind(this))
}

export const handleWhatsAppPdfShare = () => {
    var ts = Math.round((new Date()).getTime() / 1000);

    let div = document.getElementById('divToShare');
    domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
        .then(function (dataUrl) {
            pdf.addImage(dataUrl, 'JPG', 100, 10);
            var blobData = new Blob([pdf.output('blob')], { type: 'application/pdf' })

            const config = {
                bucketName: 'dss-project-bucket',
                region: 'ap-south-1',
                accessKeyId: 'AKIAUAXLRTC3KF53ZRH5',
                secretAccessKey: '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',
                ACL: "public-read"
            }
            blobData.name = "dss" + ts + ".pdf"
            S3
                .uploadFile(blobData, config)
                .then(data => {
                    var fakeLink = document.createElement('a');
                    fakeLink.setAttribute('href', 'https://' + (isMobileOrTablet() ? 'api' : 'web') + '.whatsapp.com/send?text=' + encodeURIComponent(data.location));
                    fakeLink.setAttribute('data-action', 'share/whatsapp/share');
                    fakeLink.setAttribute('target', '_blank');
                    fakeLink.click();
                })
                .catch(err => console.error(err))
        }.bind(this))
}

const isMobileOrTablet = () => {
    return (/(android|iphone|ipad|mobile)/i.test(navigator.userAgent));
}

const dataURItoBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
}