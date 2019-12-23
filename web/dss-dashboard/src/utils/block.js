import domtoimage from 'dom-to-image';
import { Promise } from 'bluebird';
// import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import base64Img from 'base64-img'
import logo from '../images/Digit.png'
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

const filterFunc = function (node) {
    if (node.id == 'divNotToPrint') return false;
    return true;
};
export const downloadAsImage = (name) => {
    // props.APITrans(true)
    return new Promise((resolve, reject) => {
        // console.log("isMobile", isMobile)
        if (isMobile) {
            return html2canvas(document.getElementById('divToPrint'), {
                allowTaint: true,
                useCORS: true,
                backgroundColor: "#F4F7FB",
                removeContainer: true,
                x: 0,
                y: 0,
                width: window.innerWidth,
                // height: 3370.39,
                // windowWidth: 2383,
                // windowHeight: 1400

            }).then(function (canvas) {
                var a = document.createElement('a');
                // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
                a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
                a.download = `${name}.jpg`;
                a.click();
                resolve(true);
            }).catch(function () {
                reject(false);
            })
            // let node = document.getElementById('divToPrint');
            // node.style.background = 'white'
            // // node.style.width = '130mm';
            // // node.style.height = '300mm';
            // node.style.margin = '0mm';
            // node.style.marginColor = 'white';
            // domtoimage.toPng(node, { quality: 0.100, bgcolor: '#F4F7FB', filter: filterFunc })
            //     .then(function (dataUrl) {
            //         var link = document.createElement('a');
            //         link.download = name || 'image.jpeg';
            //         link.href = dataUrl;
            //         link.click();
            //         resolve({});
            //     }.bind(this)).catch(function (er) {
            //         reject(er)
            //     })
        } else if (isBrowser) {
            let div = document.getElementById('divToPrint');
            domtoimage.toJpeg(div, { quality: 0.95, bgcolor: '#F4F7FB', filter: filterFunc })
                .then(function (dataUrl) {
                    var link = document.createElement('a');
                    link.download = name || 'image.jpeg';
                    link.href = dataUrl;
                    link.click();
                    // saveAs(dataUrl, 'my-node.png');
                    resolve({});
                }.bind(this)).catch(function (er) {
                    reject(er)
                })
        }
    });

}
const getFilters = (tableObj) => {
    return new Promise(function (resolve, reject) {
        try {
            var t;
            let root = document.getElementById("root")
            t = document.createElement('div');
            t.id = "printFtable"
            // t.style = `border: 2px solid;`
            // t.className = "elemClass"
            t.innerHTML = tableObj;

            // root.insertAdjacentElement('afterbegin', t);
            root.appendChild(t);
            return resolve()
        } catch (ex) {
            console.log(ex)
            return reject();
        }
    })

}
const getImageData = (dataUrl) => {
    return new Promise((resolve, reject) => {
        let image = new Image();
        image.src = dataUrl;
        image.onload = function () {
            var imgWidth = image.naturalWidth,
                imgHeight = image.naturalHeight;
            var iRatio = imgHeight / imgWidth;
            return resolve({ iRatio, imgWidth, imgHeight });
        }
    });
}

const addPages = (elem) => {
    return new Promise((resolve, reject) => {
        domtoimage.toJpeg(elem, { quality: 0.95, bgcolor: '#F4F7FB', filter: filterFunc })
            .then(function (dataUrl) {
                return getImageData(dataUrl).then(function (hw) {
                    if (isMobile) {
                        let iheight = hw.imgWidth * hw.iRatio;
                        console.log(window.innerWidth)
                        let pdf = new jsPDF("p", "pt", [iheight - 80, hw.imgWidth - 80]);
                        pdf.addImage(dataUrl, 'JPG', 0, 0);
                        // pdf.save()
                        return resolve(pdf)
                    } else {
                        base64Img.requestBase64("https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb.abohar/logo.png", function (err, res, body) {

                            var imgWidth = 210;
                            var pageHeight = 295;

                            let digitLogo = body
                            let image = new Image();
                            image.src = dataUrl;
                            var imgHeight = image.height * imgWidth / image.width;
                            var heightLeft = imgHeight;
                            var doc = new jsPDF('p', 'mm', 'a4');
                            var position = 10; // give some top padding to first page
                            let isLogoRequired = true;
                            doc.addImage(body, 'PNG', 1, 1, 10, 8);
                            if (isLogoRequired) {
                                doc.addImage(logo, 'PNG', 194, 1, 15, 8);
                            }

                            // doc.addImage(dataUrl, 'PNG', position, imgWidth, imgHeight);
                            if (dataUrl) {
                                doc.addImage(dataUrl, 'PNG', 1, position, imgWidth - 2, imgHeight);
                            }
                            heightLeft -= pageHeight;

                            while (heightLeft >= 0) {
                                position += heightLeft - imgHeight; // top padding for other pages
                                doc.addPage();
                                doc.addImage(dataUrl, 'PNG', 1, position, imgWidth - 1, imgHeight);
                                heightLeft -= pageHeight;
                            }
                            return resolve(doc)
                        });
                    }

                }.bind(this)).catch((err) => {
                    console.log(err);
                    return reject(null)
                })
            }.bind(this)).catch((err) => {
                console.log(err);
                return reject(null)
            })

    })
}

export const printDocument = (table, name) => {
    return new Promise(function (resolve, reject) {
        // getFilters(table).then(function(params) {
        //     let compon = document.getElementById("printFtable")
        //         // let elems = document.querySelectorAll('.elemClass');
        let elems = document.getElementById('divToPrint');
        // Fix Graphics Output by scaling PDF and html2canvas output to 2

        return addPages(elems).then(function (response) {
            response.save(name || 'DSS');
            return resolve(response);

        }.bind(this)).catch(function (error) {
            console.log(error);
            return reject(false);
        })
    })
    // });
}
export const printDocumentShare = (table) => {
    return new Promise(function (resolve, reject) {
        // getFilters(table).then(function(params) {
        //     let compon = document.getElementById("printFtable")
        //         // let elems = document.querySelectorAll('.elemClass');
        let elems = document.getElementById('divToPrint');
        // Fix Graphics Output by scaling PDF and html2canvas output to 2

        return addPages(elems).then(function (response) {
            // response.save();
            return resolve(response);

        }.bind(this)).catch(function (error) {
            console.log(error);
            return reject(false);
        })
    })
    // });
}