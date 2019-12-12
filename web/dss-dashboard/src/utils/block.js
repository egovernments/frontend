import domtoimage from 'dom-to-image';
import { Promise } from 'bluebird';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf'

import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

const filterFunc = function(node) {
    if (node.id == 'divNotToPrint') return false;
    return true;
};
export const downloadAsImage = (name) => {
    // props.APITrans(true)
    return new Promise((resolve, reject) => {
        // console.log("isMobile", isMobile)
        if (isMobile) {
            // return html2canvas(document.getElementById('divToPrint'), {
            //     allowTaint: true,
            //     useCORS: true,
            //     backgroundColor: "white",
            //     removeContainer: true,
            //     x: 0,
            //     y: 0,
            //     width: 2383.94,
            //     height: 3370.39,
            //     // windowWidth: 2383,
            //     // windowHeight: 1400

            // }).then(function(canvas) {
            //     var a = document.createElement('a');
            //     // toDataURL defaults to png, so we need to request a jpeg, then convert for file download.
            //     a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
            //     a.download = `${name}.jpg`;
            //     a.click();
            //     resolve(true);
            // }).catch(function() {
            //     reject(false);
            // })
            let div = document.getElementById('divToPrint');
            domtoimage.toJpeg(div, { quality: 0.95, bgcolor: '#F4F7FB', filter: filterFunc })
                .then(function(dataUrl) {
                    var link = document.createElement('a');
                    link.download = name || 'image.jpeg';
                    link.href = dataUrl;
                    link.click();
                    resolve({});
                }.bind(this)).catch(function(er) {
                    reject(er)
                })
        } else if (isBrowser) {
            let div = document.getElementById('divToPrint');
            domtoimage.toJpeg(div, { quality: 0.95, bgcolor: '#F4F7FB', filter: filterFunc })
                .then(function(dataUrl) {
                    var link = document.createElement('a');
                    link.download = name || 'image.jpeg';
                    link.href = dataUrl;
                    link.click();
                    // saveAs(dataUrl, 'my-node.png');
                    resolve({});
                }.bind(this)).catch(function(er) {
                    reject(er)
                })
        }
    });

}
const getFilters = (tableObj) => {
    return new Promise(function(resolve, reject) {
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
        image.onload = function() {
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
            .then(function(dataUrl) {
                return getImageData(dataUrl).then(function(hw) {
                    if (isMobile) {
                        let iheight = hw.imgWidth * hw.iRatio;
                        console.log(window.innerWidth)
                        let pdf = new jsPDF("p", "pt", [iheight - 80, hw.imgWidth - 80]);
                        pdf.addImage(dataUrl, 'JPG', 0, 0);
                        // pdf.save()
                        return resolve(pdf)
                    } else {
                        let iheight = hw.imgWidth * hw.iRatio;
                        let pdf = new jsPDF("l", "pt", [hw.imgWidth - 250, hw.imgHeight - 100]);
                        pdf.addImage(dataUrl, 'JPG', 30, 10);
                        // pdf.save()
                        return resolve(pdf)
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
    // console.log("printDocument called");
    return new Promise(function(resolve, reject) {
            // getFilters(table).then(function(params) {
            //     let compon = document.getElementById("printFtable")
            //         // let elems = document.querySelectorAll('.elemClass');
            let elems = document.getElementById('divToPrint');
            // Fix Graphics Output by scaling PDF and html2canvas output to 2

            return addPages(elems).then(function(response) {
                // console.log("PDF updated");
                response.save(name || 'DSS');
                return resolve(response);

            }.bind(this)).catch(function(error) {
                console.log(error);
                return reject(false);
            })
        })
        // });
}
export const printDocumentShare = (table) => {
    // console.log("printDocument called");
    return new Promise(function(resolve, reject) {
            // getFilters(table).then(function(params) {
            //     let compon = document.getElementById("printFtable")
            //         // let elems = document.querySelectorAll('.elemClass');
            let elems = document.getElementById('divToPrint');
            // Fix Graphics Output by scaling PDF and html2canvas output to 2

            return addPages(elems).then(function(response) {
                // console.log("PDF updated");
                // response.save();
                return resolve(response);

            }.bind(this)).catch(function(error) {
                console.log(error);
                return reject(false);
            })
        })
        // });
}