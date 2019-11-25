import domtoimage from 'dom-to-image';
import { Promise } from 'bluebird';
import {
    BrowserView,
    MobileView,
    isBrowser,
    isMobile
} from "react-device-detect";

export const downloadAsImage = (name) => {
    // props.APITrans(true)
    return new Promise((resolve, reject) => {
        console.log("isMobile", isMobile)
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
            domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
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
            domtoimage.toJpeg(div, { quality: 0.95, bgcolor: 'white' })
                .then(function(dataUrl) {
                    var link = document.createElement('a');
                    link.download = name || 'image.jpeg';
                    link.href = dataUrl;
                    link.click();
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
const addPages = (pdf, elem, idx, length) => {
    return new Promise((resolve, reject) => {
        // Scaling fix set scale to 2
        if (isMobile) {
            domtoimage.toJpeg(elem, { quality: 0.95, bgcolor: 'white' })
                .then(function(dataUrl) {
                    if (idx < length) {
                        if (idx == 0) {
                                // pdf.addPage();
                            pdf.addImage(dataUrl, 'JPG', 100, 10);
                        } else {
                            // pdf.addPage();
                            pdf.addImage(dataUrl, 'image/png', 10, 20);

                        }
                        return setTimeout(resolve, 100, "Timeout adding page #" + idx);
                    } else {
                        // pdf.addPage();
                        pdf.addImage(dataUrl, 100, 70);
                        console.log("Reached last page, completing");
                        return setTimeout(resolve, 100, "Timeout adding page #" + idx);
                    }
                }.bind(this))
        } else if (isBrowser) {
            domtoimage.toJpeg(elem, { quality: 0.95, bgcolor: 'white' })
                .then(function(dataUrl) {
                    if (idx < length) {
                        if (idx == 0) {
                                // pdf.addPage();
                            pdf.addImage(dataUrl, 'JPG', 100, 10);
                        } else {
                            // pdf.addPage();
                            pdf.addImage(dataUrl, 'image/png', 10, 20);

                        }
                        return setTimeout(resolve, 100, "Timeout adding page #" + idx);
                    } else {
                        // pdf.addPage();
                        pdf.addImage(dataUrl, 100, 70);
                        console.log("Reached last page, completing");
                        return setTimeout(resolve, 100, "Timeout adding page #" + idx);
                    }
                }.bind(this))
        }

    })
}
export const printDocument = (pdf, table) => {
    console.log("printDocument called");
    return new Promise(function(resolve, reject) {
        getFilters(table).then(function(params) {
            let compon = document.getElementById("printFtable")
            let elems = document.querySelectorAll('.elemClass');
            // Fix Graphics Output by scaling PDF and html2canvas output to 2
            let promiseObj = [];
            let me = []
            me.push(compon);
            elems.forEach((elem, idx) => {
                me.push(elem)
            })
            me.forEach((elem, idx) => {

                promiseObj.push(addPages(pdf, elem, idx, elems.length))
            })
            Promise.all(promiseObj).then(function(response) {
                console.log("PDF updated");
                resolve(pdf);

            }.bind(this)).catch(function(error) {
                console.log(error);
            })

        })
    });
}