import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Grid, Row, Col, Table, DropdownButton } from 'react-bootstrap';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import _ from 'lodash';
import ShowFields from '../../../framework/showFields';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { translate } from '../../../common/common';
import Api from '../../../../api/api';
import jp from 'jsonpath';
import UiButton from '../../../framework/components/UiButton';
import { fileUpload, getInitiatorPosition } from '../../../framework/utility/utility';
import $ from 'jquery';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import UiBackButton from '../../../framework/components/UiBackButton';

var specifications = {};
let reqRequired = [];
let baseUrl = 'https://raw.githubusercontent.com/abhiegov/test/master/specs/';

const REGEXP_FIND_IDX = /\[(.*?)\]+/g;

class assetCategoryCreate extends Component {
  state = {
    pathname: '',
    mdmsData: {},
  };
  constructor(props) {
    super(props);
    this.getVal = this.getVal.bind(this);
  }

  setLabelAndReturnRequired(configObject) {
    console.log(configObject);
    if (configObject && configObject.groups) {
      for (var i = 0; configObject && i < configObject.groups.length; i++) {
        configObject.groups[i].label = translate(configObject.groups[i].label);
        for (var j = 0; j < configObject.groups[i].fields.length; j++) {
          configObject.groups[i].fields[j].label = translate(configObject.groups[i].fields[j].label);
          if (configObject.groups[i].fields[j].isRequired && !configObject.groups[i].fields[j].hide && !configObject.groups[i].hide)
            reqRequired.push(configObject.groups[i].fields[j].jsonPath);
        }

        if (configObject.groups[i].children && configObject.groups[i].children.length) {
          for (var k = 0; k < configObject.groups[i].children.length; k++) {
            this.setLabelAndReturnRequired(configObject.groups[i].children[k]);
          }
        }
      }
    }
  }

  setDefaultValues(groups, dat) {
    for (var i = 0; i < groups.length; i++) {
      for (var j = 0; j < groups[i].fields.length; j++) {
        console.log(groups[i].fields[j].defaultValue);
        if (
          typeof groups[i].fields[j].defaultValue == 'string' ||
          typeof groups[i].fields[j].defaultValue == 'number' ||
          (typeof groups[i].fields[j].defaultValue == 'boolean' && groups[i].fields[j].defaultValue == true)
        ) {
          //console.log(groups[i].fields[j].name + "--" + groups[i].fields[j].defaultValue);
            _.set(dat, groups[i].fields[j].jsonPath, groups[i].fields[j].defaultValue);
        }

        if (groups[i].fields[j].children && groups[i].fields[j].children.length) {
          for (var k = 0; k < groups[i].fields[j].children.length; k++) {
            this.setDefaultValues(groups[i].fields[j].children[k].groups);
          }
        }
      }
    }
  }

  // setDefaultValues(groups, dat) {
  //   for (var i = 0; i < groups.length; i++) {
  //     for (var j = 0; j < groups[i].fields.length; j++) {
  //       if (
  //         typeof groups[i].fields[j].defaultValue == 'string' ||
  //         typeof groups[i].fields[j].defaultValue == 'number' ||
  //         typeof groups[i].fields[j].defaultValue == 'boolean'
  //       ) {
  //         _.set(dat, groups[i].fields[j].jsonPath, groups[i].fields[j].defaultValue);
  //       }
  //       if (groups[i].children && groups[i].children.length) {
  //         for (var k = 0; k < groups[i].children.length; k++) {
  //           this.setDefaultValues(groups[i].children[k].groups, dat);
  //         }
  //       }
  //     }
  //   }
  // }

  depedantValue(groups) {
    let self = this;
    for (let i = 0; i < groups.length; i++) {
      for (let j = 0; j < groups[i].fields.length; j++) {
        if (groups[i].fields[j].depedants && groups[i].fields[j].depedants.length) {
          for (let k = 0; k < groups[i].fields[j].depedants.length; k++) {
            if (groups[i].fields[j].depedants[k].type == 'dropDown') {
              let splitArray = groups[i].fields[j].depedants[k].pattern.split('?');
              let context = '';
              let id = {};
              // id[splitArray[1].split("&")[1].split("=")[0]]=e.target.value;
              for (let p = 0; p < splitArray[0].split('/').length; p++) {
                context += splitArray[0].split('/')[p] + '/';
              }

              let queryStringObject = splitArray[1].split('|')[0].split('&');
              for (let m = 0; m < queryStringObject.length; m++) {
                if (m) {
                  if (queryStringObject[m].split('=')[1].search('{') > -1) {
                    id[queryStringObject[m].split('=')[0]] = self.getVal(
                      queryStringObject[m]
                        .split('=')[1]
                        .split('{')[1]
                        .split('}')[0]
                    );
                  } else {
                    id[queryStringObject[m].split('=')[0]] = queryStringObject[m].split('=')[1];
                  }
                }
              }

              // if(id.categoryId == "" || id.categoryId == null){
              //   formData.tradeSubCategory = "";
              //   setDropDownData(value.jsonPath, []);
              //   console.log(value.jsonPath);
              //   console.log("helo", formData);
              //   return false;
              // }
              Api.commonApiPost(context, id).then(
                function(response) {
                  if (response) {
                    let queries = splitArray[1].split('|');
                    let keys = jp.query(response, queries[1]);
                    let values = jp.query(response, queries[2]);

                    let others = [];
                    if (queries.length > 3) {
                      for (let i = 3; i < queries.length; i++) {
                        others.push(jp.query(response, queries[i]) || undefined);
                      }
                    }

                    let dropDownData = [];
                    for (let t = 0; t < keys.length; t++) {
                      let obj = {};
                      obj['key'] = keys[t];
                      obj['value'] = values[t];

                      if (others && others.length > 0) {
                        let otherItemDatas = [];
                        for (let i = 0; i < others.length; i++) {
                          otherItemDatas.push(others[i][k] || undefined);
                        }
                        obj['others'] = otherItemDatas;
                      }

                      dropDownData.push(obj);
                    }
                    dropDownData.sort(function(s1, s2) {
                      return s1.value < s2.value ? -1 : s1.value > s2.value ? 1 : 0;
                    });
                    dropDownData.unshift({
                      key: null,
                      value: '-- Please Select --',
                    });
                    self.props.setDropDownData(groups[i].fields[j].depedants[k].jsonPath, dropDownData);
                    self.props.setDropDownOriginalData(response, dropDownData);
                  }
                },
                function(err) {
                  console.log(err);
                }
              );
            }
          }
        }

        if (groups[i].fields[j].children && groups[i].fields[j].children.length) {
          for (var k = 0; k < groups[i].fields[j].children.length; k++) {
            self.depedantValue(groups[i].fields[j].children[k].groups);
          }
        }
      }
    }
  }

  setInitialUpdateChildData(form, children) {
    let _form = JSON.parse(JSON.stringify(form));
    for (var i = 0; i < children.length; i++) {
      for (var j = 0; j < children[i].groups.length; j++) {
        if (children[i].groups[j].multiple) {
          var arr = _.get(_form, children[i].groups[j].jsonPath);
          var ind = j;
          var _stringifiedGroup = JSON.stringify(children[i].groups[j]);
          var regex = new RegExp(children[i].groups[j].jsonPath.replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '\\[\\d{1}\\]', 'g');
          for (var k = 1; k < arr.length; k++) {
            j++;
            children[i].groups[j].groups.splice(
              ind + 1,
              0,
              JSON.parse(_stringifiedGroup.replace(regex, children[i].groups[ind].jsonPath + '[' + k + ']'))
            );
            children[i].groups[j].groups[ind + 1].index = ind + 1;
          }
        }

        if (children[i].groups[j].children && children[i].groups[j].children.length) {
          this.setInitialUpdateChildData(form, children[i].groups[j].children);
        }
      }
    }
  }

  setInitialUpdateData(form, specs, moduleName, actionName, objectName) {
    let { setMockData } = this.props;
    let _form = JSON.parse(JSON.stringify(form));
    var ind;
    console.log(specs[moduleName + '.' + actionName]);
    for (var i = 0; i < specs[moduleName + '.' + actionName].groups.length; i++) {
      if (specs[moduleName + '.' + actionName].groups[i].multiple) {
        if (_form.MasterMetaData.masterData[0].assetFieldsDefination != null) {
          var arr = _.get(_form, specs[moduleName + '.' + actionName].groups[i].jsonPath);
          console.log(arr);
          ind = i;
          var _stringifiedGroup = JSON.stringify(specs[moduleName + '.' + actionName].groups[i]);
          var regex = new RegExp(
            specs[moduleName + '.' + actionName].groups[i].jsonPath.replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '\\[\\d{1}\\]',
            'g'
          );
          for (var j = 1; j < arr.length; j++) {
            i++;
            specs[moduleName + '.' + actionName].groups.splice(
              j + 1,
              0,
              JSON.parse(_stringifiedGroup.replace(regex, specs[moduleName + '.' + actionName].groups[ind].jsonPath + '[' + j + ']'))
            );
            specs[moduleName + '.' + actionName].groups[ind + 1].index = j;
          }
        }
      }

      if (specs[moduleName + '.' + actionName].groups[ind || i].children && specs[moduleName + '.' + actionName].groups[ind || i].children.length) {
        this.setInitialUpdateChildData(form, specs[moduleName + '.' + actionName].groups[ind || i].children);
      }
    }

    setMockData(specs);
    console.log(this.props.formData);
  }

  modifyData(urlId) {
    let self = this;
    let assetCheck = {};
    let specifications = require(`../../../framework/specs/asset/master/createAssetCategroy`).default;

    var _body = {
      MdmsCriteria: {
        tenantId: localStorage.getItem("tenantId"),
        moduleDetails:  [
          {
            "moduleName": "ASSET",
            "masterDetails": [
              {
                "name": "AssetCategory",
                "filter": "[?(@.id IN [" + self.props.match.params.id + "])]"
              }
            ]
          }
        ]
      }
    }
    Api.commonApiPost('/egov-mdms-service/v1/_search', '', _body,{},true,true).then(
      function(response) {
        var MasterMetaData = {};
        var masterData = [];
        console.log(response.MdmsRes.ASSET.AssetCategory);
        MasterMetaData.masterData = response.MdmsRes.ASSET.AssetCategory;
        if(MasterMetaData.masterData[0].isDepreciationApplicable == true){
          MasterMetaData.masterData[0].isDepreciationApplicable = "YES";
        } else{
          MasterMetaData.masterData[0].isDepreciationApplicable = "NO";
        }
        // response.Assets[0].assetAttributesCheck = assetCheck;
        self.props.setFormData({ MasterMetaData: MasterMetaData });
        console.log(self.props.formData);
        self.handleChange({ target: { value: MasterMetaData.masterData[0].assetCategoryType } }, 'MasterMetaData.masterData[0].assetCategoryType');
        self.handleChange({ target: { value: MasterMetaData.masterData[0].id } }, 'MasterMetaData.masterData[0].id');
        self.setInitialUpdateData(
          { MasterMetaData: MasterMetaData },
          JSON.parse(JSON.stringify(specifications)),
          'asset',
          'update',
          specifications['asset.update'].objectName
        );
      },
      function(err) {
        console.log(err);
      }
    );
  }


  displayUI(results) {
    let { setMetaData, setModuleName, setActionName, initForm, setMockData, setFormData } = this.props;
    let hashLocation = window.location.hash;
    let self = this;

    specifications = typeof results == 'string' ? JSON.parse(results) : results;
    let obj = self.props.match.params.id ? specifications[`asset.update`] : specifications[`asset.create`];
    reqRequired = [];
    self.setLabelAndReturnRequired(obj);
    initForm(reqRequired);
    setMetaData(specifications);
    setMockData(JSON.parse(JSON.stringify(specifications)));
    setModuleName('asset');
    if (self.props.match.params.id) {
      setActionName('update');
    }else{
      setActionName('create');
    }

    if (hashLocation.split('/').indexOf('update') == 1) {
      // var url = specifications[`asset.update`].searchUrl.split('?')[0];
      // var id = (self.props.match.params.id && decodeURIComponent(self.props.match.params.id)) || self.props.match.params.master;
      // var query = {
      //   [specifications[`asset.update`].searchUrl.split('?')[1].split('=')[0]]: id,
      // };
      // //handle 2nd parameter
      // if (specifications[`asset.update`].searchUrl.split('?')[1].split('=')[2]) {
      //   var pval = specifications[`asset.update`].searchUrl.split('?')[1].split('=')[2];
      //   var pname = specifications[`asset.update`].searchUrl
      //     .split('?')[1]
      //     .split('=')[1]
      //     .split('&')[1];
      //
      //   query = {
      //     [specifications[`asset.update`].searchUrl.split('?')[1].split('=')[0]]: id,
      //     [pname]: pval,
      //   };
      // }
      //
      // if (window.location.href.indexOf('?') > -1) {
      //   var qs = window.location.href.split('?')[1];
      //   if (qs && qs.indexOf('=') > -1) {
      //     qs = qs.indexOf('&') > -1 ? qs.split('&') : [qs];
      //     for (var i = 0; i < qs.length; i++) {
      //       query[qs[i].split('=')[0]] = qs[i].split('=')[1];
      //     }
      //   }
      // }
      //
      // self.props.setLoadingStatus('loading');
      // var _body = {
      //   MdmsCriteria: {
      //     tenantId: localStorage.getItem("tenantId"),
      //     moduleDetails:  [
      //       {
      //         "moduleName": "ASSET",
      //         "masterDetails": [
      //           {
      //             "filter": "[?(@.id IN [" + "12" + "])]"
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // }
      // Api.commonApiPost('/egov-mdms-service/v1/_search', '', _body,{},true,true).then(
      //   function(res) {
      //     console.log("res");
      //     self.props.setLoadingStatus('hide');
      //     if (specifications[`asset.update`].isResponseArray) {
      //       var obj = {};
      //       _.set(obj, specifications[`asset.update`].objectName, jp.query(res, '$..[0]')[0]);
      //       self.props.setFormData(obj);
      //       self.setInitialUpdateData(obj, JSON.parse(JSON.stringify(specifications)), 'asset', 'update', specifications[`asset.update`].objectName);
      //     } else {
      //       self.setInitialUpdateData(res, JSON.parse(JSON.stringify(specifications)), 'asset', 'update', specifications[`asset.update`].objectName);
      //       self.props.setFormData(res);
      //     }
      //     let obj1 = specifications[`asset.update`];
      //
      //     self.depedantValue(obj1.groups);
      //   },
      //   function(err) {
      //     self.props.setLoadingStatus('hide');
      //   }
      // );
    } else {
      var formData = {};
      if (obj && obj.groups && obj.groups.length) self.setDefaultValues(obj.groups, formData);
      setFormData(formData);
      let mockObj = specifications[`asset.create`];

      var id = self.props.match.params.id && decodeURIComponent(self.props.match.params.id);
      if (id) {
        //console.log('id', id);
        if (mockObj.onloadFetchUrl) {
          let params = JSON.parse(id);
          self.props.setLoadingStatus('loading');

          let requestBody = {};

          Object.keys(params).map(key => {
            _.set(requestBody, key, params[key]);
          });

          Api.commonApiPost(mockObj.onloadFetchUrl, {}, requestBody, false, mockObj.useTimestamp).then(
            function(res) {
              self.props.setLoadingStatus('hide');
              console.log("here");
              if (specifications[`asset.create`].isResponseArray) {
                var obj = {};
                _.set(obj, specifications[`asset.create`].objectName, jp.query(res, '$..[0]')[0]);
                self.props.setFormData(obj);
                self.setInitialUpdateData(
                  obj,
                  JSON.parse(JSON.stringify(specifications)),
                  'asset',
                  'create',
                  specifications[`asset.create`].objectName
                );
              } else {
                self.setInitialUpdateData(
                  res,
                  JSON.parse(JSON.stringify(specifications)),
                  'asset',
                  'create',
                  specifications[`asset.create`].objectName
                );
                self.props.setFormData(res);
              }
              let obj1 = specifications[`asset.create`];

              self.depedantValue(obj1.groups);
            },
            function(err) {
              self.props.setLoadingStatus('hide');
            }
          );
        }
      }

      Promise.all([
        Api.commonApiPost('/egov-mdms-service/v1/_get?moduleName=ASSET&masterName=AssetCategory', {}, {}, false, mockObj.useTimestamp),
      ]).then(responses => {
        let searchAPI = responses[0];
        console.log(self.props.match.params.id);
        if(self.props.match.params.id){
          this.setState({
          createId: self.props.match.params.id,
        });
        }else
        {
          var maxIdObject = _.maxBy(searchAPI.MdmsRes.ASSET.AssetCategory, function(o) { return Number(o.id);});
          var maxId = maxIdObject.id;
          var maxIdInc = ++maxId;
          this.setState({
          createId: maxIdInc
        });
      }
      });
    }
    var res = self.handleMasterData(specifications, this.props.moduleName);

    this.setState({
      pathname: this.props.history.location.pathname,
    });
  }

  handleMasterData(specifications) {
    let self = this;
    let moduleDetails = [];
    let { setDropDownData } = this.props;
    let hashLocation = window.location.hash;
    let obj = specifications[`asset.create`];
    let name, filter;
    // let {moduleName, actionName, setMockData} = this.props;
    let data = { moduleName: '', masterDetails: [] };
    let k = 0;
    var masterDetail = {};
    for (let i = 0; i < obj.groups.length; i++) {
      for (let j = 0; j < obj.groups[i].fields.length; j++) {
        if (obj.groups[i].fields[j].mdms) {
          masterDetail.name = obj.groups[i].fields[j].mdms.masterName;
          masterDetail.filter = obj.groups[i].fields[j].mdms.filter != '' ? obj.groups[i].fields[j].mdms.filter : null;
          data.masterDetails[k] = _.cloneDeep(masterDetail);
          data.moduleName = obj.groups[i].fields[j].mdms.moduleName;
          k++;
        }
      }
    }
    moduleDetails.push(data);
    // var _body = {
      /*    MdmsCriteria: {
        tenantId: localStorage.getItem("tenantId"),
        moduleDetails: moduleDetails
      }
*/
    //   MdmsCriteria: {
    //     tenantId: localStorage.getItem('tenantId'),
    //     moduleDetails: [
    //       {
    //         moduleName: 'ASSET',
    //         masterDetails: [
    //           {
    //             id: 18,
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // };
    //
    // Api.commonApiPost('/egov-mdms-service/v1/_search', '', _body, {}, true, true)
    //   .then(res => {
    //     this.setState({
    //       mdmsData: res.MdmsRes,
    //     });
    //
    //     //set dropdowndata
    //     for (let i = 0; i < obj.groups.length; i++) {
    //       for (let j = 0; j < obj.groups[i].fields.length; j++) {
    //         if (obj.groups[i].fields[j].mdms) {
    //           let dropDownData = [];
    //           if (Object.keys(res.MdmsRes).includes(obj.groups[i].fields[j].mdms.moduleName)) {
    //             for (var prop in res.MdmsRes) {
    //               if (obj.groups[i].fields[j].mdms.dependant) continue;
    //               if (res.MdmsRes.hasOwnProperty(prop)) {
    //                 if (prop == obj.groups[i].fields[j].mdms.moduleName)
    //                   for (var master in res.MdmsRes[prop]) {
    //                     if (res.MdmsRes[prop].hasOwnProperty(master)) {
    //                       var moduleObj = res.MdmsRes[prop];
    //                       if (master == obj.groups[i].fields[j].mdms.masterName) {
    //                         moduleObj[master].forEach(function(item) {
    //                           let masterObj = { key: '', value: '' };
    //                           masterObj.key = item[obj.groups[i].fields[j].mdms.key];
    //                           masterObj.value = item[obj.groups[i].fields[j].mdms.value];
    //                           dropDownData.push(masterObj);
    //                         });
    //                       }
    //                     }
    //                   }
    //               }
    //             }
    //           }
    //           setDropDownData(obj.groups[i].fields[j].jsonPath, dropDownData);
    //         }
    //       }
    //     }
    //   })
      // .catch(err => {
      //   console.log(err);
      // });
  }

  checkifHasDependedantMdmsField(path, value) {
    let obj = { ..._mockData };
    let _mockData = { ...this.props.mockData };
    let { moduleName, actionName, setMockData, setDropDownData } = this.props;
    for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
      for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
        if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].mdms) {
          if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].mdms.dependant) {
            let exp = _mockData[moduleName + '.' + actionName].groups[i].fields[j].mdms.dependant.jsonExp;
            let valuePath = exp.split("=='")[1];
            valuePath = valuePath.split("')]")[0];
            if (path == valuePath) {
              exp = exp.replace(path, value);
              var dropdownValues = jp.query(this.state.mdmsData, exp);
              let dropdowndata = [];
              dropdownValues.forEach(function(item) {
                let masterObj = { key: '', value: '' };
                masterObj.key = item[_mockData[moduleName + '.' + actionName].groups[i].fields[j].mdms.key];
                masterObj.value = item[_mockData[moduleName + '.' + actionName].groups[i].fields[j].mdms.value];
                dropdowndata.push(masterObj);
              });
              setDropDownData(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath, dropdowndata);
            }
          }
        }
      }
    }
  }

  initData() {
    var hash = window.location.hash.split('/');
    let endPoint = '';
    let self = this;
    // try {
    //   if(hash.length == 3 || (hash.length == 4 && hash.indexOf("update") > -1)) {
    //     specifications = require(`./specs/${hash[2]}/${hash[2]}`).default;
    //   } else {
    //     specifications = require(`./specs/${hash[2]}/master/${hash[3]}`).default;
    //   }
    // } catch(e) {
    //   console.log(e);
    // }
    specifications = require(`../../../framework/specs/asset/master/createAssetCategroy`).default;
    self.displayUI(specifications);
  }

  componentDidMount() {
    let self = this;
    this.initData();
    console.log(specifications);
    if (self.props.match.params.id) {
      self.modifyData(self.props.match.params.id);
      console.log(specifications['asset.update']);
    }


    //  Api.commonApiPost("/egov-mdms-service/v1/_search",{},{}, false, false, false, "", "", false).then(function(response)
    // {
    //   console.log(response);
    // },function(err) {
    //       console.log(err);
    //  });
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.pathname && this.state.pathname != nextProps.history.location.pathname) {
      this.initData();
    }
  }

  autoComHandler = (autoObject, path) => {
    let self = this;
    var value = this.getVal(path);
    if (!value) return;
    var url = autoObject.autoCompleteUrl.split('?')[0];
    var hashLocation = window.location.hash;
    var parameters = autoObject.autoCompleteUrl.substr(autoObject.autoCompleteUrl.indexOf('?') + 1);
    if (parameters.split('&').length > 1) {
      var params = parameters.split('&');
      var query = {};
      for (var i = 0; i < params.length; i++) {
        if (params[i].indexOf('{') > 0) {
          params[i] = params[i].replace(params[i].substr(params[i].indexOf('{'), params[i].indexOf('}') + 1 - params[i].indexOf('{')), value);
        }
        var index = params[i].indexOf('=');
        var id = params[i].substr(0, index);
        var val = params[i].substr(index + 1);
        query[id] = val;
      }
    } else {
      var param = parameters.replace(parameters.substr(parameters.indexOf('{'), parameters.indexOf('}') + 1 - parameters.indexOf('{')), value);
      var index = param.indexOf('=');
      var query = {
        [param.substr(0, index)]: param.substr(index + 1),
      };
    }

    Api.commonApiPost(url, query, {}, false, specifications[`asset.create`].useTimestamp).then(
      function(res) {
        var formData = { ...self.props.formData };
        for (var key in autoObject.autoFillFields) {
          _.set(formData, key, _.get(res, autoObject.autoFillFields[key]));
        }
        self.props.setFormData(formData);
      },
      function(err) {
        console.log(err);
      }
    );
  };

  makeAjaxCall = (formData, url) => {
    let self = this;
    //delete formData.ResponseInfo;
    //return console.log(formData);
    Api.commonApiPost(url || self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].url, '', formData, '', true).then(
      function(response) {
        console.log(self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].url);
        if(response && response.MdmsRes && response.MdmsRes.ASSET && response.MdmsRes.ASSET.AssetCategory &&  response.MdmsRes.ASSET.AssetCategory[0]){
        const cacheKey =  self.props.moduleName + "." + response.MdmsRes.ASSET.AssetCategory[0].id  + '.assetcategory.search';
        "",		 +      window.sessionStorage.setItem(cacheKey,JSON.stringify(response));
        }
        self.props.setLoadingStatus('hide');
        self.initData();
        self.props.toggleSnackbarAndSetText(
          true,
          translate(self.props.actionName == 'create' ? 'wc.create.message.success' : 'wc.update.message.success'),
          true
        );
        setTimeout(function() {
          if (self.props.actionName == 'update') {
            var hash = '/non-framework/asset/master/assetCategoryView/' + response.MdmsRes.ASSET.AssetCategory[0].id;
          }else {
            var hash = '/non-framework/asset/master/assetCategoryView/' + response.MdmsRes.ASSET.AssetCategory[0].id;
          }
          if (self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].idJsonPath) {
            if (self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].ackUrl) {
              var hash =
                self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].ackUrl +
                '/' +
                encodeURIComponent(_.get(response, self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].idJsonPath));
            } else {
              if (self.props.actionName == 'update') {
                var hash = '/non-framework/asset/master/assetCategoryView/' + response.MdmsRes.ASSET.AssetCategory[0].id;
              } else {
                var hash = '/non-framework/asset/master/assetCategoryView/' + response.MdmsRes.ASSET.AssetCategory[0].id;
              }
            }

            self.props.setRoute(hash);
          }
        }, 1500);
      },
      function(err) {
        self.props.setLoadingStatus('hide');
        self.props.toggleSnackbarAndSetText(true, err.message);
      }
    );
  };

  //Needs to be changed later for more customfields
  checkCustomFields = (formData, cb) => {
    var self = this;
    if (
      self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].customFields &&
      self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].customFields.initiatorPosition
    ) {
      var jPath = self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].customFields.initiatorPosition;
      getInitiatorPosition(function(err, pos) {
        if (err) {
          self.toggleSnackbarAndSetText(true, err.message);
        } else {
          _.set(formData, jPath, pos);
          cb(formData);
        }
      });
    } else {
      cb(formData);
    }
  };

  getFileList = (mockObject, formData, fileList = {}) => {
    for (let i = 0; i < mockObject.groups.length; i++) {
      for (let j = 0; j < mockObject.groups[i].fields.length; j++) {
        if (mockObject.groups[i].fields[j].type == 'singleFileUpload' && _.get(formData, mockObject.groups[i].fields[j].jsonPath)) {
          fileList[mockObject.groups[i].fields[j].jsonPath] = _.get(formData, mockObject.groups[i].fields[j].jsonPath);
        }
      }

      if (mockObject.groups[i].children && mockObject.groups[i].children.length) {
        for (var k = 0; k < mockObject.groups[i].children.length; k++) {
          this.getFileList(mockObject.groups[i].children[k], formData, fileList);
        }
      }
    }
  };

  checkForOtherFiles = (formData, _url) => {
    // console.log(_url);
    let { mockData, actionName, moduleName } = this.props;
    let self = this;
    let fileList = {};
    this.getFileList(mockData[moduleName + '.' + actionName], formData, fileList);
    let counter = Object.keys(fileList).length;
    if (!counter) {
      self.makeAjaxCall(formData, _url);
    } else {
      let breakOut = 0;
      for (let key in fileList) {
        fileUpload(fileList[key], moduleName, function(err, res) {
          if (breakOut == 1) return;
          if (err) {
            breakOut = 1;
            self.props.setLoadingStatus('hide');
            self.props.toggleSnackbarAndSetText(true, err, false, true);
          } else {
            counter--;
            _.set(formData, key, res.files[0].fileStoreId);
            if (counter == 0 && breakOut == 0) self.makeAjaxCall(formData, _url);
          }
        });
      }
    }
  };

  initiateWF = (action, workflowItem, isHidden, status) => {
    let formData = { ...this.props.formData };
    if (!_.get(formData.workflowItem.jsonPath.objectPath)) {
      _.set(formData, workflowItem.jsonPath.objectPath, {});
    }

    if (!isHidden && !_.get(formData, workflowItem.jsonPath.assigneePath)) {
      return this.props.toggleSnackbarAndSetText(true, translate('wc.create.workflow.fields'), false, true);
    }

    if (action.key.toLowerCase() == 'reject' && !_.get(formData, workflowItem.commentsPath)) {
      return this.props.toggleSnackbarAndSetText(true, translate('wc.create.workflow.comment'), false, true);
    }

    _.set(formData, workflowItem.jsonPath.actionPath, action.key);
    _.set(formData, workflowItem.jsonPath.statusPath, status);
    //this.create();
  };

  create = e => {
    let self = this,
      _url;
    if (e) e.preventDefault();
    var formData = { ...this.props.formData };
    var flagIndicate = 0;
    if(!formData.MasterMetaData.masterData[0].parent || formData.MasterMetaData.masterData[0].parent == ""){
      formData.MasterMetaData.masterData[0].parent = null;
      //setting value isAssetAllow based on parent or subcategory
      formData.MasterMetaData.masterData[0].isAssetAllow = false;
    }else {
      formData.MasterMetaData.masterData[0].isAssetAllow = true;
    }
    if(formData.MasterMetaData.masterData[0].name){
      Api.commonApiPost('/egov-mdms-service/v1/_get', {
        moduleName: 'ASSET',
        masterName: 'AssetCategory',
        filter: '%5B%3F%28+%40.assetCategoryType%3D%3D%27'+ formData.MasterMetaData.masterData[0].assetCategoryType +'%27%29%5D'

      }).then(
        function(response) {
          for(var i = 0; i < response.MdmsRes.ASSET.AssetCategory.length ; i++){
            if(self.props.match.params.id){
              if(response.MdmsRes.ASSET.AssetCategory[i].name.toLowerCase().trim() == formData.MasterMetaData.masterData[0].name.toLowerCase().trim() && response.MdmsRes.ASSET.AssetCategory[i].id != formData.MasterMetaData.masterData[0].id){
                flagIndicate = 0;
                break;
              } else {
                flagIndicate = 1;
              }
            } else {
              if(response.MdmsRes.ASSET.AssetCategory[i].name.toLowerCase().trim() == formData.MasterMetaData.masterData[0].name.toLowerCase().trim()){
                flagIndicate = 0;
                break;
              } else {
                flagIndicate = 1;
              }
            }
          }
          self.nameValidationCreate(e, flagIndicate);
        },
        function(err) {
          console.log(err);
        }
      );
    }
};

  nameValidationCreate = (e, flagIndicate) => {
    let self = this,
      _url;
    if (e) e.preventDefault();
    var formData = { ...this.props.formData };
    console.log(flagIndicate);
      if(flagIndicate == 1){
      self.props.setLoadingStatus('loading');
      if (formData.MasterMetaData) {
        formData.MasterMetaData.masterData[0].id = this.state.createId + "";
        formData.MasterMetaData.masterData[0].code = this.state.createId + "";
        //need to work on the logic
        //formData.MasterMetaData.masterData[0].isAssetAllow = true;
        formData.MasterMetaData.masterData[0].tenantId = localStorage.getItem('tenantId');
      }
      if (formData && formData.MasterMetaData && formData.MasterMetaData.masterData && formData.MasterMetaData.masterData[0].isDepreciationApplicable) {
        if (formData.MasterMetaData.masterData[0].isDepreciationApplicable == 'YES') {
          formData.MasterMetaData.masterData[0].isDepreciationApplicable = true;
        } else {
          formData.MasterMetaData.masterData[0].isDepreciationApplicable = false;
        }
      }

      if (
        self.props.moduleName &&
        self.props.actionName &&
        self.props.metaData &&
        self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].tenantIdRequired
      ) {
        if (!formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName])
          formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName] = {};

        if (formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName].constructor == Array) {
          for (var i = 0; i < formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName].length; i++) {
            formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName][i]['tenantId'] =
              localStorage.getItem('tenantId') || 'default';
          }
        } else
          formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName]['tenantId'] =
            localStorage.getItem('tenantId') || 'default';
      }

      if (
        self.props.moduleName &&
        self.props.actionName &&
        self.props.metaData &&
        self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].moduleName
      ) {
        if (formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName].constructor == Array) {
          for (var i = 0; i < formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName].length; i++) {
            formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName][i]['moduleName'] =
              self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].moduleName;
          }
        } else
          formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName]['moduleName'] =
            self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].moduleName;
      }

      if (
        self.props.moduleName &&
        self.props.actionName &&
        self.props.metaData &&
        self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].masterName
      ) {
        if (formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName].constructor == Array) {
          for (var i = 0; i < formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName].length; i++) {
            formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName][i]['masterName'] =
              self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].masterName;
          }
        } else
          formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName]['masterName'] =
            self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].masterName;
      }

      if (/\{.*\}/.test(self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].url)) {
        _url = self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].url;
        console.log(_url);
        var match = _url.match(/\{.*\}/)[0];
        var jPath = match.replace(/\{|}/g, '');
        _url = _url.replace(match, _.get(formData, jPath));
      }

      //Check if documents, upload and get fileStoreId
      let formdocumentData = formData[self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].objectName];
      let documentPath = self.props.metaData[`${self.props.moduleName}.${self.props.actionName}`].documentsPath;

      formdocumentData = (formdocumentData && formdocumentData.length && formdocumentData[0]) || formdocumentData;
      if (documentPath) {
        formdocumentData = _.get(formData, documentPath);
      }

      if (formdocumentData['documents'] && formdocumentData['documents'].length) {
        let documents = [...formdocumentData['documents']];
        let _docs = [];
        let counter = documents.length,
          breakOut = 0;
        for (let i = 0; i < documents.length; i++) {
          fileUpload(documents[i].fileStoreId, self.props.moduleName, function(err, res) {
            if (breakOut == 1) return;
            if (err) {
              breakOut = 1;
              self.props.setLoadingStatus('hide');
              self.props.toggleSnackbarAndSetText(true, err, false, true);
            } else {
              _docs.push({
                ...documents[i],
                fileStoreId: res.files[0].fileStoreId,
              });
              counter--;
              if (counter == 0 && breakOut == 0) {
                formdocumentData['documents'] = _docs;
                self.makeAjaxCall(formData, _url);
              }
            }
          });
        }
      } else {
        self.makeAjaxCall(formData, _url);
      }
    }  else {
      this.props.toggleSnackbarAndSetText(true, 'Category already exist', false, true);
    }
  }

  getVal = (path, dateBool) => {
    var _val = _.get(this.props.formData, path);
    if (dateBool && typeof _val == 'string' && _val && _val.indexOf('-') > -1) {
      var _date = _val.split('-');
      return new Date(_date[0], Number(_date[1]) - 1, _date[2]);
    }

    return typeof _val != 'undefined' ? _val : '';
  };

  setVal = (jsonPath, value) => {
    let formData = { ...this.props.formData };
    _.set(formData, jsonPath, value);
    this.props.setFormData(formData);
  };

  getValFromDropdownData = (fieldJsonPath, key, path) => {
    let dropdownData = this.props.dropDownData[fieldJsonPath] || [];
    let _val = _.get(dropdownData.find(data => data.key == key) || [], path);
    return typeof _val != 'undefined' ? _val : '';
  };

  hideField = (_mockData, hideObject, reset, val) => {
    let { moduleName, actionName, setFormData, delRequiredFields, removeFieldErrors, addRequiredFields } = this.props;
    let _formData = { ...this.props.formData };
    if (hideObject.isField) {
      for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
        for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
          if (hideObject.name == _mockData[moduleName + '.' + actionName].groups[i].fields[j].name) {
            reset = this.resetCheck(_mockData, hideObject.name, val);
            _mockData[moduleName + '.' + actionName].groups[i].fields[j].hide = reset ? false : true;
            if (!reset) {
              _.set(_formData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath, '');
              setFormData(_formData);
              //Check if required is true, if yes remove from required fields
              if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].isRequired) {
                delRequiredFields([_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath]);
                removeFieldErrors(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath);
              }
            } else if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].isRequired) {
              addRequiredFields([_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath]);
            }

            break;
          }
        }
      }
    } else {
      let flag = 0;
      for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
        if (hideObject.name == _mockData[moduleName + '.' + actionName].groups[i].name) {
          flag = 1;

          reset = this.resetCheck(_mockData, hideObject.name, val);
          //console.log(hideObject.name,reset);
          _mockData[moduleName + '.' + actionName].groups[i].hide = reset ? false : true;

          if (!reset) {
            var _rReq = [];
            for (var j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
              _.set(_formData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath, '');
              if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].isRequired) {
                _rReq.push(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath);
                removeFieldErrors(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath);
              }
            }
            delRequiredFields(_rReq);
            setFormData(_formData);
          } else {
            var _rReq = [];
            for (var j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
              if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].isRequired)
                _rReq.push(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath);
            }
            addRequiredFields(_rReq);
          }
          break;
        }
      }

      if (flag == 0) {
        for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
          if (_mockData[moduleName + '.' + actionName].groups[i].children && _mockData[moduleName + '.' + actionName].groups[i].children.length) {
            for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].children.length; j++) {
              for (let k = 0; k < _mockData[moduleName + '.' + actionName].groups[i].children[j].groups.length; k++) {
                if (hideObject.name == _mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].name) {
                  reset = this.resetCheck(_mockData, hideObject.name, val);
                  _mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].hide = reset ? false : true;
                  if (!reset) {
                    var _rReq = [];
                    for (let a = 0; a < _mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].fields.length; a++) {
                      _.set(_formData, _mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].fields[a].jsonPath, '');
                      if (_mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].fields[a].isRequired) {
                        _rReq.push(_mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].fields[a].jsonPath);
                        removeFieldErrors(_mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].fields[a].jsonPath);
                      }
                    }
                    delRequiredFields(_rReq);
                    setFormData(_formData);
                  } else {
                    var _rReq = [];
                    for (let a = 0; a < _mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].fields.length; a++) {
                      if (_mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].fields[a].isRequired)
                        _rReq.push(_mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].fields[a].jsonPath);
                    }
                    addRequiredFields(_rReq);
                  }
                }
              }
            }
          }
        }
      }
    }
    return _mockData;
  };

  resetCheck = (mockData, element, val) => {
    //let val = 'TEXT';
    // console.log('reset check here');
    let { moduleName, actionName, setMockData } = this.props;
    for (let i = 0; i < mockData[moduleName + '.' + actionName].groups.length; i++) {
      for (let j = 0; j < mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
        if (mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields) {
          for (let k = 0; k < mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields.length; k++) {
            if (mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].ifValue) {
              for (var l = 0; l < mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].hide.length; l++) {
                if (
                  val == mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].ifValue &&
                  element == mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].hide[l].name
                ) {
                  return false;
                }
              }
              for (var l = 0; l < mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].show.length; l++) {
                if (
                  val == mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].ifValue &&
                  element == mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].show[l].name
                ) {
                  return true;
                }
              }
            }
          }
        }
      }
    }
  };

  showField = (_mockData, showObject, reset) => {
    let { moduleName, actionName, setFormData, delRequiredFields, removeFieldErrors, addRequiredFields } = this.props;
    let _formData = { ...this.props.formData };
    if (showObject.isField) {
      for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
        for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
          if (showObject.name == _mockData[moduleName + '.' + actionName].groups[i].fields[j].name) {
            _mockData[moduleName + '.' + actionName].groups[i].fields[j].hide = reset ? true : false;
            if (!reset) {
              _.set(_formData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath, '');
              setFormData(_formData);
              if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].isRequired) {
                addRequiredFields([_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath]);
              }
            } else if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].isRequired) {
              delRequiredFields([_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath]);
              removeFieldErrors(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath);
            }
            break;
          }
        }
      }
    } else {
      let flag = 0;
      for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
        if (showObject.name == _mockData[moduleName + '.' + actionName].groups[i].name) {
          flag = 1;
          _mockData[moduleName + '.' + actionName].groups[i].hide = reset ? true : false;
          if (!reset) {
            var _rReq = [];
            for (var j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
              _.set(_formData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath, '');
              if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].isRequired)
                _rReq.push(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath);
            }

            addRequiredFields(_rReq);
            setFormData(_formData);
          } else {
            var _rReq = [];
            for (var j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
              if (_mockData[moduleName + '.' + actionName].groups[i].fields[j].isRequired) {
                _rReq.push(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath);
                removeFieldErrors(_mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath);
              }
            }

            if (_mockData[moduleName + '.' + actionName].groups[i].children && _mockData[moduleName + '.' + actionName].groups[i].children.length) {
              for (var z = 0; z < _mockData[moduleName + '.' + actionName].groups[i].children.length; z++) {
                for (var y = 0; y < _mockData[moduleName + '.' + actionName].groups[i].children[z].groups.length; y++) {
                  for (var x = 0; x < _mockData[moduleName + '.' + actionName].groups[i].children[z].groups[y].fields.length; x++) {
                    if (_mockData[moduleName + '.' + actionName].groups[i].children[z].groups[y].fields[x].isRequired) {
                      _rReq.push(_mockData[moduleName + '.' + actionName].groups[i].children[z].groups[y].fields[x].jsonPath);
                      removeFieldErrors(_mockData[moduleName + '.' + actionName].groups[i].children[z].groups[y].fields[x].jsonPath);
                    }
                  }
                }
              }
            }

            delRequiredFields(_rReq);
          }
          break;
        }
      }

      if (flag == 0) {
        for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
          if (_mockData[moduleName + '.' + actionName].groups[i].children && _mockData[moduleName + '.' + actionName].groups[i].children.length) {
            for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].children.length; j++) {
              for (let k = 0; k < _mockData[moduleName + '.' + actionName].groups[i].children[j].groups.length; k++) {
                if (showObject.name == _mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].name) {
                  _mockData[moduleName + '.' + actionName].groups[i].children[j].groups[k].hide = reset ? true : false;
                  /*if(!reset) {

                  } else {

                  }*/
                }
              }
            }
          }
        }
      }
    }

    return _mockData;
  };

  enField = (_mockData, enableStr, reset) => {
    let { moduleName, actionName, setFormData } = this.props;
    let _formData = { ...this.props.formData };
    for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
      for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
        if (enableStr == _mockData[moduleName + '.' + actionName].groups[i].fields[j].name) {
          _mockData[moduleName + '.' + actionName].groups[i].fields[j].isDisabled = reset ? true : false;
          if (!reset) {
            _.set(_formData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath, '');
            setFormData(_formData);
          }
          break;
        }
      }
    }

    return _mockData;
  };

  disField = (_mockData, disableStr, reset) => {
    let { moduleName, actionName, setFormData } = this.props;
    let _formData = { ...this.props.formData };
    for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
      for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
        if (disableStr == _mockData[moduleName + '.' + actionName].groups[i].fields[j].name) {
          _mockData[moduleName + '.' + actionName].groups[i].fields[j].isDisabled = reset ? false : true;
          if (!reset) {
            _.set(_formData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath, '');
            setFormData(_formData);
          }

          break;
        }
      }
    }

    return _mockData;
  };

  checkIfHasEnDisFields = (jsonPath, val) => {
    let _mockData = { ...this.props.mockData };
    let { moduleName, actionName, setMockData } = this.props;
    for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
      for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
        if (
          jsonPath == _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath &&
          _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields &&
          _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields.length
        ) {
          for (let k = 0; k < _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields.length; k++) {
            if (val == _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].ifValue) {
              for (let y = 0; y < _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].disable.length; y++) {
                _mockData = this.disField(_mockData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].disable[y]);
              }

              for (let z = 0; z < _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].enable.length; z++) {
                _mockData = this.enField(_mockData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].enable[z]);
              }
            } else {
              for (let y = 0; y < _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].disable.length; y++) {
                _mockData = this.disField(
                  _mockData,
                  _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].disable[y],
                  true
                );
              }

              for (let z = 0; z < _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].enable.length; z++) {
                _mockData = this.enField(
                  _mockData,
                  _mockData[moduleName + '.' + actionName].groups[i].fields[j].enableDisableFields[k].enable[z],
                  true
                );
              }
            }
          }
        }
      }
    }

    setMockData(_mockData);
  };

  checkIfHasShowHideFields = (jsonPath, val) => {
    let _mockData = { ...this.props.mockData };
    let { moduleName, actionName, setMockData } = this.props;
    for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
      for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
        if (
          jsonPath == _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath &&
          _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields &&
          _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields.length
        ) {
          for (let k = 0; k < _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields.length; k++) {
            if (val == _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].ifValue) {
              for (let y = 0; y < _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].hide.length; y++) {
                _mockData = this.hideField(
                  _mockData,
                  _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].hide[y],
                  false,
                  val
                );
              }

              for (let z = 0; z < _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].show.length; z++) {
                _mockData = this.showField(_mockData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].show[z]);
              }
            } else {
              for (let y = 0; y < _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].hide.length; y++) {
                _mockData = this.hideField(
                  _mockData,
                  _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].hide[y],
                  true,
                  val
                );
              }

              for (let z = 0; z < _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].show.length; z++) {
                _mockData = this.showField(_mockData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].showHideFields[k].show[z], true);
              }
            }
          }
        }
      }
    }
    setMockData(_mockData);
  };

  checkifHasValueBasedOn = (jsonPath, val) => {
    let _mockData = { ...this.props.mockData };
    let { formData } = this.props;
    let { moduleName, actionName, setMockData } = this.props;
    for (let i = 0; i < _mockData[moduleName + '.' + actionName].groups.length; i++) {
      for (let j = 0; j < _mockData[moduleName + '.' + actionName].groups[i].fields.length; j++) {
        if (
          _mockData[moduleName + '.' + actionName].groups[i].fields[j].valueBasedOn &&
          _mockData[moduleName + '.' + actionName].groups[i].fields[j].valueBasedOn.length
        ) {
          for (let k = 0; k < _mockData[moduleName + '.' + actionName].groups[i].fields[j].valueBasedOn.length; k++) {
            if (this.getVal(_mockData[moduleName + '.' + actionName].groups[i].fields[j].valueBasedOn[k].jsonPath)) {
              _.set(
                formData,
                _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath,
                _mockData[moduleName + '.' + actionName].groups[i].fields[j].valueBasedOn[k].valueIfDataFound
              );
            } else {
              _.set(
                formData,
                _mockData[moduleName + '.' + actionName].groups[i].fields[j].jsonPath,
                !_mockData[moduleName + '.' + actionName].groups[i].fields[j].valueBasedOn[k].valueIfDataFound
              );
              _.set(formData, _mockData[moduleName + '.' + actionName].groups[i].fields[j].valueBasedOn[k].jsonPath, '');
            }
          }
        }
      }
    }
    setMockData(_mockData);
  };

  makeAPICallGetResponse = (urlWithJsonPath, isStateLevel) => {
    let urlResults = urlWithJsonPath.split(/\|/g);
    let params = urlResults[0].match(/\{(.*?)\}/g);

    for (let i = 0; i < params.length; i++) urlResults[0] = urlResults[0].replace(params[i], this.getVal(params[i].replace(/(\}?)(\{?)/, '')));

    return new Promise(function(resolve, reject) {
      Api.commonApiPost(urlResults[0], {}, {}, false, false, false, '', '', isStateLevel).then(
        function(response) {
          if (response) {
            resolve(jp.query(response, urlResults[1]));
          } else {
            reject('Error');
          }
        },
        function(error) {
          reject('Error');
        }
      );
    });
  };

  mandatoryCheck = _value => {
    let valueWarranty = _value;
    let self = this;
    let spec = self.props.mockData;

    for (var q = 0; q < spec[`asset.create`].groups.length; q++) {
     if (spec[`asset.create`].groups[q].name == 'createCategoryType') {
        for (var l = 0; l < spec[`asset.create`].groups[q].fields.length; l++) {
          if (spec[`asset.create`].groups[q].fields[l].name == 'DepericiationRate') {
            console.log(valueWarranty);
            if (valueWarranty == "NO") {
              spec[`asset.create`].groups[q].fields[l].isRequired = false;
              self.props.delRequiredFields(['MasterMetaData.masterData[0].depreciationRate']);
              self.props.setMockData(JSON.parse(JSON.stringify(spec)));
            }
            else if (valueWarranty == "YES") {
              spec[`asset.create`].groups[q].fields[l].isRequired = true;
              self.props.addRequiredFields(['MasterMetaData.masterData[0].depreciationRate']);
              self.props.setMockData(JSON.parse(JSON.stringify(spec)));
            }
          }
        }
     }
    }

    for (var q = 0; q < spec[`asset.update`].groups.length; q++) {
     if (spec[`asset.update`].groups[q].name == 'createCategoryType') {
        for (var l = 0; l < spec[`asset.update`].groups[q].fields.length; l++) {
          if (spec[`asset.update`].groups[q].fields[l].name == 'DepericiationRate') {
            console.log(valueWarranty);
            if (valueWarranty == "NO") {
              spec[`asset.update`].groups[q].fields[l].isRequired = false;
              self.props.delRequiredFields(['MasterMetaData.masterData[0].depreciationRate']);
              self.props.setMockData(JSON.parse(JSON.stringify(spec)));
            }
            else if (valueWarranty == "YES") {
              spec[`asset.update`].groups[q].fields[l].isRequired = true;
              self.props.addRequiredFields(['MasterMetaData.masterData[0].depreciationRate']);
              self.props.setMockData(JSON.parse(JSON.stringify(spec)));
            }
          }
        }
     }
    }
  };

  affectDependants = (obj, e, property) => {
    let { handleChange, setDropDownData, setDropDownOriginalData, dropDownOringalData } = this.props;
    let { getVal, getValFromDropdownData, returnPathValueFunction } = this;

    const findLastIdxOnJsonPath = jsonPath => {
      var str = jsonPath.split(REGEXP_FIND_IDX);
      for (let i = str.length - 1; i > -1; i--) {
        if (str[i].match(/\d+/)) {
          return str[i];
        }
      }
      return undefined;
    };

    const replaceLastIdxOnJsonPath = (jsonPath, replaceIdx) => {
      var str = jsonPath.split(REGEXP_FIND_IDX);
      var isReplaced = false;
      for (let i = str.length - 1; i > -1; i--) {
        if (str[i].match(/\d+/)) {
          if (!isReplaced) {
            isReplaced = true;
            str[i] = `[${replaceIdx}]`;
          } else str[i] = `[${str[i]}]`;
        }
      }
      return str.join('');
    };
    let depedants = jp.query(obj, `$.groups..fields[?(@.jsonPath=="${property}")].depedants.*`);
    let dependantIdx;
    if (depedants.length === 0 && property) {
      let currentProperty = property;
      dependantIdx = findLastIdxOnJsonPath(property);
      if (dependantIdx !== undefined) currentProperty = replaceLastIdxOnJsonPath(property, 0); //RESET INDEX 0 TO FIND DEPENDANT FIELDS FROM TEMPLATE JSON
      depedants = jp.query(obj, `$.groups..fields[?(@.type=="tableList")].tableList.values[?(@.jsonPath == "${currentProperty}")].depedants.*`);

      //Changes to handle table sum
      var jpathname = property.substr(0, property.lastIndexOf('[') + 1) + '0' + property.substr(property.lastIndexOf('[') + 2);

      var dependency = jp.query(obj, `$.groups..values[?(@.jsonPath=="${jpathname}")].dependency`);
      if (dependency.length > 0) {
        let _formData = {
          ...this.props.formData,
        };
        if (_formData) {
          let field = property.substr(0, property.lastIndexOf('['));
          let last = property.substr(property.lastIndexOf(']') + 2);
          let curIndex = property.substr(property.lastIndexOf('[') + 1, 1);

          let arrval = _.get(_formData, field);
          if (arrval) {
            let len = _.get(_formData, field).length;

            let amtsum = 0;
            let svalue = '';
            for (var i = 0; i < len; i++) {
              let ifield = field + '[' + i + ']' + '.' + last;
              if (i == curIndex) {
                svalue = e.target.value;
              } else {
                svalue = _.get(_formData, ifield);
              }

              amtsum += parseInt(svalue);
            }
            if (amtsum > 0) {
              handleChange(
                {
                  target: {
                    value: amtsum,
                  },
                },
                dependency[0],
                false,
                '',
                ''
              );
            }
          }
        }
      }
    }
    _.forEach(depedants, function(value, key) {
      //console.log(value.type);
      if (value.type == 'dropDown') {
        let splitArray = value.pattern.split('?');
        let context = '';
        let id = {};
        for (var j = 0; j < splitArray[0].split('/').length; j++) {
          context += splitArray[0].split('/')[j] + '/';
        }

        let queryStringObject = splitArray[1].split('|')[0].split('&');
        for (var i = 0; i < queryStringObject.length; i++) {
          if (i) {
            if (queryStringObject[i].split('=')[1].search('{') > -1) {
              if (
                queryStringObject[i]
                  .split('=')[1]
                  .split('{')[1]
                  .split('}')[0] == property
              ) {
                //console.log("replacing!!!", queryStringObject[i].split("=")[1], queryStringObject[i].split("=")[1].replace(/\{(.*?)\}/, e.target.value))
                id[queryStringObject[i].split('=')[0]] = queryStringObject[i].split('=')[1].replace(/\{(.*?)\}/, e.target.value) || '';
              } else {
                id[queryStringObject[i].split('=')[0]] =
                  queryStringObject[i].split('=')[1].replace(
                    /\{(.*?)\}/,
                    getVal(
                      queryStringObject[i]
                        .split('=')[1]
                        .split('{')[1]
                        .split('}')[0]
                    )
                  ) || '';
              }
            } else {
              id[queryStringObject[i].split('=')[0]] = queryStringObject[i].split('=')[1];
            }
          }
        }

        Api.commonApiPost(context, id, {}, false, false, false, '', '', value.isStateLevel).then(
          function(response) {
            if (response) {
              let keys = jp.query(response, splitArray[1].split('|')[1]);
              let values = jp.query(response, splitArray[1].split('|')[2]);
              let dropDownData = [];
              for (var k = 0; k < keys.length; k++) {
                let obj = {};
                obj['key'] = keys[k];
                obj['value'] = values[k];
                dropDownData.push(obj);
              }

              dropDownData.sort(function(s1, s2) {
                return s1.value < s2.value ? -1 : s1.value > s2.value ? 1 : 0;
              });
              dropDownData.unshift({ key: null, value: '-- Please Select --' });
              setDropDownData(value.jsonPath, dropDownData);
              setDropDownOriginalData(value.jsonPath, response);
            }
          },
          function(err) {
            console.log(err);
          }
        );
      } else if (value.type == 'textField') {
        try {
          let object = {};
          if (!value.hasFromDropDownOriginalData || value.url) {
            let exp = value.valExp;
            if (dependantIdx) {
              value.jsonPath = replaceLastIdxOnJsonPath(value.jsonPath, dependantIdx);
              exp = exp && exp.replace(/\*/g, dependantIdx);
            }

            let ajaxResult;
            if (value.url) {
              ajaxResult = this.makeAPICallGetResponse(value.url);
            }

            object = {
              target: {
                value: (ajaxResult && ajaxResult) || (exp && eval(exp)) || eval(eval(value.pattern)),
              },
            };
          } else {
            // console.log(dropDownOringalData);
            // console.log(value.pattern);
            // console.log(dropDownOringalData[value.pattern.split("|")[0]][value.pattern.split("|")[1]]);
            var arr = dropDownOringalData[value.pattern.split('|')[0]][value.pattern.split('|')[1]];
            var searchPropery = value.pattern.split('|')[2];
            var propertyRelToDepedant = value.pattern.split('|')[3];
            object = {
              target: {
                value: '',
              },
            };
            for (var i = 0; i < arr.length; i++) {
              if (arr[i][searchPropery] == e.target.value) {
                object.target.value = arr[i][propertyRelToDepedant];
              }
            }
          }

          handleChange(object, value.jsonPath, '', '', '', '');
        } catch (ex) {
          console.log('ex', ex);
        }
      } else if (value.type == 'autoFill') {
        let splitArray = value.pattern.split('?');
        let context = '';
        let id = {};
        for (var j = 0; j < splitArray[0].split('/').length; j++) {
          context += splitArray[0].split('/')[j] + '/';
        }

        let queryStringObject = splitArray[1].split('|')[0].split('&');
        for (var i = 0; i < queryStringObject.length; i++) {
          if (i) {
            if (queryStringObject[i].split('=')[1].search('{') > -1) {
              if (
                queryStringObject[i]
                  .split('=')[1]
                  .split('{')[1]
                  .split('}')[0] == property
              ) {
                id[queryStringObject[i].split('=')[0]] = e.target.value || '';
              } else {
                id[queryStringObject[i].split('=')[0]] = getVal(
                  queryStringObject[i]
                    .split('=')[1]
                    .split('{')[1]
                    .split('}')[0]
                );
              }
            } else {
              id[queryStringObject[i].split('=')[0]] = queryStringObject[i].split('=')[1];
            }
          }
        }

        Api.commonApiPost(context, id).then(
          function(response) {
            if (response) {
              for (var key in value.autoFillFields) {
                var keyField = key.substr(0, key.lastIndexOf('['));
                var keyLast = key.substr(key.lastIndexOf(']') + 2);
                var propertyCurIndex = property.substr(property.lastIndexOf('[') + 1, 1);
                var newKey = keyField + '[' + propertyCurIndex + '].' + keyLast;
                handleChange(
                  {
                    target: {
                      value: _.get(response, value.autoFillFields[key]),
                    },
                  },
                  newKey,
                  false,
                  '',
                  ''
                );
              }
            }
          },
          function(err) {
            console.log(err);
          }
        );
      } else if (value.type == 'radio') {
        if (value.hasFromDropDownOriginalData) {
          var arr = dropDownOringalData[value.pattern.split('|')[0]][value.pattern.split('|')[1]];
          var searchPropery = value.pattern.split('|')[2];
          var propertyRelToDepedant = value.pattern.split('|')[3];
          var object = {
            target: {
              value: '',
            },
          };
          for (var i = 0; i < arr.length; i++) {
            if (arr[i][searchPropery] == e.target.value) {
              object.target.value = arr[i][propertyRelToDepedant];
            }
          }

          console.log(object);

          handleChange(object, value.jsonPath, '', '', '', '');
        }
      }
      // else if (value.type == "documentList") {
      //
      //   let splitArray = value.pattern.split("?");
      //   let context = "";
      //   let id = {};
      //   for (var j = 0; j < splitArray[0].split("/").length; j++) {
      //     context+=splitArray[0].split("/")[j]+"/";
      //   }
      //
      //
      //   let queryStringObject=splitArray[1].split("|")[0].split("&");
      //   for (var i = 0; i < queryStringObject.length; i++) {
      //     if (i) {
      //       if (queryStringObject[i].split("=")[1].search("{")>-1) {
      //         if (queryStringObject[i].split("=")[1].split("{")[1].split("}")[0]==property) {
      //           id[queryStringObject[i].split("=")[0]] = e.target.value || "";
      //         } else {
      //           console.log(queryStringObject[i].split("=")[1].split("{")[1].split("}")[0]);
      //           id[queryStringObject[i].split("=")[0]] = e.target.value;//getVal(queryStringObject[i].split("=")[1].split("{")[1].split("}")[0]);
      //         }
      //       } else {
      //         id[queryStringObject[i].split("=")[0]] = queryStringObject[i].split("=")[1];
      //       }
      //     }
      //   }
      //
      //
      //   Api.commonApiPost(context, id).then(function(response) {
      //     if(response) {
      //       //console.log(item);
      //       var documents = [];
      // 			//console.log(this.props);
      //       //let {documentList, useTimestamp, handler} = props;
      //       for (var k = 0; k < response.length; k++) {
      //
      //         var temp = {
      // 					"fileStoreId": "",
      // 					"displayName": response[k].name,
      // 					"name": ""
      // 				};
      //
      //         documents.push(temp);
      //       }
      //       handleChange({target: {value: documents}}, value.jsonPath, false, '');
      //
      //       //handleChange({target: {value: temp}}, value.jsonPath, false, '', '');
      //     }
      //   },function(err) {
      //       console.log(err);
      //   });
      //   // var arr=dropDownOringalData[value.pattern.split("|")[0]][value.pattern.split("|")[1]];
      //   // var searchPropery=value.pattern.split("|")[2];
      //   // var property=value.pattern.split("|")[3];
      //   //console.log(props,'here');
      //
      // }
      //console.log(value.type);
    });
  };

  handleChange = (e, property, isRequired, pattern, requiredErrMsg = 'Required', patternErrMsg = 'Pattern Missmatch', expression, expErr, isDate) => {
    let { getVal } = this.props;
    let { handleChange, mockData, setDropDownData, formData } = this.props;
    let hashLocation = window.location.hash;
    let obj = specifications[`asset.create`];
    let self = this;

    if(property == "MasterMetaData.masterData[0].isDepreciationApplicable"){
      self.mandatoryCheck(e.target.value);
    }
    if (expression && e.target.value) {
      let str = expression;
      let pos = 0;
      let values = [];
      if(property=='MasterMetaData.masterData[0].isDepreciationApplicable'){
        console.log("hi");
      }



      while (pos < str.length) {
        if (str.indexOf('$', pos) > -1) {
          let ind = str.indexOf('$', pos);
          let spaceInd = str.indexOf(' ', ind) > -1 ? str.indexOf(' ', ind) : str.length - 1;
          let value = str.substr(ind, spaceInd);
          if (value != '$' + property) {
            values.push(value.substr(1));
            str = str.replace(value, "getVal('" + value.substr(1, value.length) + "')");
          } else str = str.replace(value, 'e.target.value');
          pos++;
        } else {
          pos++;
        }
      }

      let _flag = 0;
      for (var i = 0; i < values.length; i++) {
        if (!getVal(values[i])) {
          _flag = 1;
        }
      }

      if (isDate && e.target.value && [12, 13].indexOf((e.target.value + '').length) == -1) {
        _flag = 1;
      }

      if (_flag == 0) {
        if (!eval(str)) {
          return this.props.toggleSnackbarAndSetText(true, translate(expErr), false, true);
        }
      }
    }

    // if(property == "MasterMetaData.masterData[0].name"){
    //   var names = [];
    //   Api.commonApiPost('/egov-mdms-service/v1/_get', {
    //     moduleName: 'ASSET',
    //     masterName: 'AssetCategory',
    //   }).then(
    //     function(response) {
    //       for(var i = 0; i < response.MdmsRes.ASSET.AssetCategory.length ; i++){
    //         names.push(response.MdmsRes.ASSET.AssetCategory[i].name);
    //       }
    //     },
    //     function(err) {
    //       console.log(err);
    //     }
    //   );
    // }

    this.checkifHasValueBasedOn(property, e.target.value);
    this.checkIfHasShowHideFields(property, e.target.value);
    this.checkIfHasEnDisFields(property, e.target.value);
    this.checkifHasDependedantMdmsField(property, e.target.value);

    try {
      handleChange(e, property, isRequired, pattern, requiredErrMsg, patternErrMsg);
    } catch (e) {
      console.log('error in autocomplete . It is version issue');
      console.log(e);
    }
    this.affectDependants(obj, e, property);
  };

  incrementIndexValue = (group, jsonPath) => {
    let { formData } = this.props;
    var length = _.get(formData, jsonPath) ? _.get(formData, jsonPath).length : 0;
    var _group = JSON.stringify(group);
    var regexp = new RegExp(jsonPath + '\\[\\d{1}\\]', 'g');
    _group = _group.replace(regexp, jsonPath + '[' + length + ']');
    return JSON.parse(_group);
  };

  getNewSpecs = (group, updatedSpecs, path) => {
    let { moduleName, actionName } = this.props;
    let groupsArray = _.get(updatedSpecs[moduleName + '.' + actionName], path);
    groupsArray.push(group);
    _.set(updatedSpecs[moduleName + '.' + actionName], path, groupsArray);
    return updatedSpecs;
  };

  getPath = value => {
    let { mockData, moduleName, actionName } = this.props;
    const getFromGroup = function(groups) {
      for (var i = 0; i < groups.length; i++) {
        if (groups[i].children) {
          for (var j = 0; j < groups[i].children.length; i++) {
            if (groups[i].children[j].jsonPath == value) {
              return 'groups[' + i + '].children[' + j + '].groups';
            } else {
              return 'groups[' + i + '].children[' + j + '][' + getFromGroup(groups[i].children[j].groups) + ']';
            }
          }
        }
      }
    };

    return getFromGroup(mockData[moduleName + '.' + actionName].groups);
  };

  addNewCard = (group, jsonPath, groupName) => {
    let self = this;
    let { setMockData, metaData, moduleName, actionName, setFormData, formData, addRequiredFields } = this.props;
    let mockData = { ...this.props.mockData };
    let reqFields = [];
    if (!jsonPath) {
      for (var i = 0; i < metaData[moduleName + '.' + actionName].groups.length; i++) {
        if (groupName == metaData[moduleName + '.' + actionName].groups[i].name) {
          var _groupToBeInserted = {
            ...metaData[moduleName + '.' + actionName].groups[i],
          };
          for (var j = mockData[moduleName + '.' + actionName].groups.length - 1; j >= 0; j--) {
            if (groupName == mockData[moduleName + '.' + actionName].groups[j].name) {
              var regexp = new RegExp(
                mockData[moduleName + '.' + actionName].groups[j].jsonPath.replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '\\[\\d{1}\\]',
                'g'
              );
              console.log(regexp);
              var stringified = JSON.stringify(_groupToBeInserted);
              console.log(j);
              console.log(mockData[moduleName + '.' + actionName].groups[j]);
              var ind = (j - 1) || 0;
              //console.log(ind);
              _groupToBeInserted = JSON.parse(
                stringified.replace(regexp, mockData[moduleName + '.' + actionName].groups[i].jsonPath + '[' + (ind + 1) + ']')
              );
              _groupToBeInserted.index = ind + 1;

              for (var k = 0; k < _groupToBeInserted.fields.length; k++) {
                if (_groupToBeInserted.fields[k].isRequired) {
                  reqFields.push(_groupToBeInserted.fields[k].jsonPath);
                }
              }

              if (reqFields.length) addRequiredFields(reqFields);
              mockData[moduleName + '.' + actionName].groups.splice(j + 1, 0, _groupToBeInserted);
              // console.log(mockData[moduleName + "." + actionName].groups);
              setMockData(mockData);
              var temp = { ...formData };
              self.setDefaultValues(mockData[moduleName + '.' + actionName].groups, temp);
              // console.log(temp);
              setFormData(temp);
              break;
            }
          }
          break;
        }
      }
    } else {
      group = JSON.parse(JSON.stringify(group));
      //Increment the values of indexes
      var grp = _.get(metaData[moduleName + '.' + actionName], self.getPath(jsonPath) + '[0]');
      group = this.incrementIndexValue(grp, jsonPath);
      //Push to the path
      var updatedSpecs = this.getNewSpecs(group, JSON.parse(JSON.stringify(mockData)), self.getPath(jsonPath));
      //Create new mock data
      setMockData(updatedSpecs);
    }
  };

  removeCard = (jsonPath, index, groupName) => {
    //Remove at that index and update upper array values
    let { setMockData, moduleName, actionName, setFormData, delRequiredFields } = this.props;
    let _formData = { ...this.props.formData };
    let self = this;
    let mockData = { ...this.props.mockData };
    let notReqFields = [];

    if (!jsonPath) {
      var ind = 0;
      for (let i = 0; i < mockData[moduleName + '.' + actionName].groups.length; i++) {
        if (index == i && groupName == mockData[moduleName + '.' + actionName].groups[i].name) {
          mockData[moduleName + '.' + actionName].groups.splice(i, 1);
          ind = i;
          for (var k = 0; k < mockData[moduleName + '.' + actionName].groups[ind].fields.length; k++) {
            if (mockData[moduleName + '.' + actionName].groups[ind].fields[k].isRequired)
              notReqFields.push(mockData[moduleName + '.' + actionName].groups[ind].fields[k].jsonPath);
          }
          delRequiredFields(notReqFields);
          break;
        }
      }

      for (let i = ind; i < mockData[moduleName + '.' + actionName].groups.length; i++) {
        if (mockData[moduleName + '.' + actionName].groups[i].name == groupName) {
          var regexp = new RegExp(
            mockData[moduleName + '.' + actionName].groups[i].jsonPath.replace(/\[/g, '\\[').replace(/\]/g, '\\]') + '\\[\\d{1}\\]',
            'g'
          );
          //console.log(regexp);
          //console.log(mockData[moduleName + "." + actionName].groups[i].index);
          //console.log(mockData[moduleName + "." + actionName].groups[i].index);
          var stringified = JSON.stringify(mockData[moduleName + '.' + actionName].groups[i]);
          mockData[moduleName + '.' + actionName].groups[i] = JSON.parse(
            stringified.replace(
              regexp,
              mockData[moduleName + '.' + actionName].groups[i].jsonPath + '[' + (mockData[moduleName + '.' + actionName].groups[i].index - 1) + ']'
            )
          );

          if (_.get(_formData, mockData[moduleName + '.' + actionName].groups[i].jsonPath)) {
            var grps = [..._.get(_formData, mockData[moduleName + '.' + actionName].groups[i].jsonPath)];
            //console.log(mockData[moduleName + "." + actionName].groups[i].index-1);
            //console.log(mockData[moduleName + "." + actionName].groups);
            grps.splice(mockData[moduleName + '.' + actionName].groups[i].index - 1, 1);
            _.set(_formData, mockData[moduleName + '.' + actionName].groups[i].jsonPath, grps);
            //console.log(_formData);
            setFormData(_formData);

            //Reduce index values
            for (let k = ind; k < mockData[moduleName + '.' + actionName].groups.length; k++) {
              if (mockData[moduleName + '.' + actionName].groups[k].name == groupName) {
                mockData[moduleName + '.' + actionName].groups[k].index -= 1;
              }
            }
            break;
          }
        }
      }
      //console.log(mockData[moduleName + "." + actionName].groups);
      setMockData(mockData);
    } else {
      var _groups = _.get(mockData[moduleName + '.' + actionName], self.getPath(jsonPath));
      _groups.splice(index, 1);
      var regexp = new RegExp('\\[\\d{1}\\]', 'g');
      for (var i = index; i < _groups.length; i++) {
        var stringified = JSON.stringify(_groups[i]);
        _groups[i] = JSON.parse(stringified.replace(regexp, '[' + i + ']'));
      }

      _.set(mockData, self.getPath(jsonPath), _groups);
      setMockData(mockData);
    }
  };

  // addNewCard = (group, jsonPath, groupName) => {
  //   let self = this;
  //   let {setMockData, metaData, moduleName, actionName, setFormData, formData} = this.props;
  //   let mockData = {...this.props.mockData};
  //   if(!jsonPath) {
  //     for(var i=0; i<metaData[moduleName + "." + actionName].groups.length; i++) {
  //       if(groupName == metaData[moduleName + "." + actionName].groups[i].name) {
  //         var _groupToBeInserted = {...metaData[moduleName + "." + actionName].groups[i]};
  //         for(var j=(mockData[moduleName + "." + actionName].groups.length-1); j>=0; j--) {
  //           if(groupName == mockData[moduleName + "." + actionName].groups[j].name) {
  //             var regexp = new RegExp(mockData[moduleName + "." + actionName].groups[j].jsonPath.replace(/\[/g, "\\[").replace(/\]/g, "\\]") + "\\[\\d{1}\\]", "g");
  //             var stringified = JSON.stringify(_groupToBeInserted);
  //             var ind = mockData[moduleName + "." + actionName].groups[j].index || 0;
  //             //console.log(ind);
  //             _groupToBeInserted = JSON.parse(stringified.replace(regexp, mockData[moduleName + "." + actionName].groups[i].jsonPath + "[" + (ind+1) + "]"));
  //             _groupToBeInserted.index = ind+1;
  //             mockData[moduleName + "." + actionName].groups.splice(j+1, 0, _groupToBeInserted);
  //             //console.log(mockData[moduleName + "." + actionName].groups);
  //             setMockData(mockData);
  //             var temp = {...formData};
  //             self.setDefaultValues(mockData[moduleName + "." + actionName].groups, temp);
  //             setFormData(temp);
  //             break;
  //           }
  //         }
  //         break;
  //       }
  //     }
  //   } else {
  //     group = JSON.parse(JSON.stringify(group));
  //     //Increment the values of indexes
  //     var grp = _.get(metaData[moduleName + "." + actionName], self.getPath(jsonPath)+ '[0]');
  //     group = this.incrementIndexValue(grp, jsonPath);
  //     //Push to the path
  //     var updatedSpecs = this.getNewSpecs(group, JSON.parse(JSON.stringify(mockData)), self.getPath(jsonPath));
  //     //Create new mock data
  //     setMockData(updatedSpecs);
  //   }
  // }

  // removeCard = (jsonPath, index, groupName) => {
  //   //Remove at that index and update upper array values
  //   let {setMockData, moduleName, actionName, setFormData} = this.props;
  //   let _formData = {...this.props.formData};
  //   let self = this;
  //   let mockData = {...this.props.mockData};
  //
  //   if(!jsonPath) {
  //     var ind = 0;
  //     for(let i=0; i<mockData[moduleName + "." + actionName].groups.length; i++) {
  //       if(index == i && groupName == mockData[moduleName + "." + actionName].groups[i].name) {
  //         mockData[moduleName + "." + actionName].groups.splice(i, 1);
  //         ind = i;
  //         break;
  //       }
  //     }
  //
  //     for(let i=ind; i<mockData[moduleName + "." + actionName].groups.length; i++) {
  //       if(mockData[moduleName + "." + actionName].groups[i].name == groupName) {
  //         var regexp = new RegExp(mockData[moduleName + "." + actionName].groups[i].jsonPath.replace(/\[/g, "\\[").replace(/\]/g, "\\]") + "\\[\\d{1}\\]", "g");
  //         //console.log(regexp);
  //         //console.log(mockData[moduleName + "." + actionName].groups[i].index);
  //         //console.log(mockData[moduleName + "." + actionName].groups[i].index);
  //         var stringified = JSON.stringify(mockData[moduleName + "." + actionName].groups[i]);
  //         mockData[moduleName + "." + actionName].groups[i] = JSON.parse(stringified.replace(regexp, mockData[moduleName + "." + actionName].groups[i].jsonPath + "[" + (mockData[moduleName + "." + actionName].groups[i].index-1) + "]"));
  //
  //         if(_.get(_formData, mockData[moduleName + "." + actionName].groups[i].jsonPath)) {
  //           var grps = [..._.get(_formData, mockData[moduleName + "." + actionName].groups[i].jsonPath)];
  //           //console.log(mockData[moduleName + "." + actionName].groups[i].index-1);
  //           grps.splice((mockData[moduleName + "." + actionName].groups[i].index-1), 1);
  //           //console.log(grps);
  //           _.set(_formData, mockData[moduleName + "." + actionName].groups[i].jsonPath, grps);
  //           //console.log(_formData);
  //           setFormData(_formData);
  //         }
  //       }
  //     }
  //     //console.log(mockData[moduleName + "." + actionName].groups);
  //     setMockData(mockData);
  //   } else {
  //     var _groups = _.get(mockData[moduleName + "." + actionName], self.getPath(jsonPath));
  //     _groups.splice(index, 1);
  //     var regexp = new RegExp("\\[\\d{1}\\]", "g");
  //     for(var i=index; i<_groups.length; i++) {
  //       var stringified = JSON.stringify(_groups[i]);
  //       _groups[i] = JSON.parse(stringified.replace(regexp, "[" + i + "]"));
  //     }
  //
  //     _.set(mockData, self.getPath(jsonPath), _groups);
  //     setMockData(mockData);
  //     }
  // }

  render() {
    let { mockData, moduleName, actionName, formData, fieldErrors, isFormValid } = this.props;
    let { create, handleChange, setVal, getVal, addNewCard, removeCard, autoComHandler, initiateWF } = this;
    let customActionsAndUrl =
      !_.isEmpty(mockData[`${moduleName}.${actionName}`]) && mockData[`${moduleName}.${actionName}`].hasOwnProperty('customActionsAndUrl')
        ? mockData[`${moduleName}.${actionName}`]['customActionsAndUrl'][0].url
        : '';
        console.log(formData);
    //let isUpdateDataFetched = actionName==='update'? !_.isEmpty(formData) : true;
    //  console.log({...this.props.formData})
    return (
      <div className="Report">
        <Row>
          <Col xs={6} md={6}>
            <h3 style={{ paddingLeft: 15, marginBottom: '0' }}>
              {!_.isEmpty(mockData) &&
              moduleName &&
              actionName &&
              mockData[`${moduleName}.${actionName}`] &&
              mockData[`${moduleName}.${actionName}`].title
                ? translate(mockData[`${moduleName}.${actionName}`].title)
                : ''}
            </h3>
          </Col>
          <Col xs={6} md={6} />
        </Row>

        <form
          onSubmit={e => {
            create(e);
          }}
        >
          <Row>
            <Col xs={6} md={6}>
            <div
              style={{
                marginLeft: '16px',
              }}
            >
              <UiBackButton customUrl={'/non-framework/asset/master/assetCategorySearch'}
              onClick={() => {
                this.initData();
              }}
              />
            </div>
            </Col>
            <Col xs={6} md={6}>
              <div style={{ textAlign: 'right', marginRight: '16px' }}>
                <RaisedButton
                  icon={
                    <i style={{ color: 'black' }} className="material-icons">
                      backspace
                    </i>
                  }
                  label="Reset"
                  primary={false}
                  onClick={() => {
                    this.initData();
                  }}
                />{' '}
                &nbsp;&nbsp;
                {actionName == 'create' && (
                  <UiButton
                    item={{
                      label: 'Save',
                      uiType: 'submit',
                      isDisabled: isFormValid ? false : true,
                    }}
                    icon={
                      <i style={{ color: 'white' }} className="material-icons">
                        save
                      </i>
                    }
                    ui="google"
                  />
                )}
                {actionName == 'update' && (
                  <UiButton
                    item={{
                      label: 'Update',
                      uiType: 'submit',
                      isDisabled: isFormValid ? false : true,
                    }}
                    icon={
                      <i style={{ color: 'white' }} className="material-icons">
                        update
                      </i>
                    }
                    ui="google"
                  />
                )}
              </div>
            </Col>
          </Row>
          {!_.isEmpty(mockData) &&
            moduleName &&
            actionName &&
            mockData[`${moduleName}.${actionName}`] && (
              <ShowFields
                groups={mockData[`${moduleName}.${actionName}`].groups}
                noCols={mockData[`${moduleName}.${actionName}`].numCols}
                ui="google"
                handler={handleChange}
                makeAjaxCall={this.makeAPICallGetResponse}
                addRequiredFields={this.props.addRequiredFields}
                delRequiredFields={this.props.delRequiredFields}
                setVal={setVal}
                getVal={getVal}
                fieldErrors={fieldErrors}
                useTimestamp={mockData[`${moduleName}.${actionName}`].useTimestamp || false}
                addNewCard={addNewCard}
                removeCard={removeCard}
                autoComHandler={autoComHandler}
                initiateWF={initiateWF}
                screen={window.location.hash.split('/').indexOf('update') == 1 ? 'update' : 'create'}
                workflowId={
                  window.location.hash.split('/').indexOf('update') == 1
                    ? (this.props.match.params.id && decodeURIComponent(this.props.match.params.id)) || this.props.match.params.master
                    : ''
                }
              />
            )}
          <div
            style={{
              textAlign: 'right',
              color: '#FF0000',
              marginTop: '15px',
              marginRight: '15px',
              paddingTop: '8px',
            }}
          >
            <i>( * ) {translate('framework.required.note')}</i>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  metaData: state.framework.metaData,
  mockData: state.framework.mockData,
  moduleName: state.framework.moduleName,
  actionName: state.framework.actionName,
  formData: state.frameworkForm.form,
  fieldErrors: state.frameworkForm.fieldErrors,
  isFormValid: state.frameworkForm.isFormValid,
  requiredFields: state.frameworkForm.requiredFields,
  dropDownData: state.framework.dropDownData,
  dropDownOringalData: state.framework.dropDownOringalData,
});

const mapDispatchToProps = dispatch => ({
  initForm: requiredFields => {
    dispatch({
      type: 'SET_REQUIRED_FIELDS',
      requiredFields,
    });
  },
  setMetaData: metaData => {
    dispatch({ type: 'SET_META_DATA', metaData });
  },
  setMockData: mockData => {
    dispatch({ type: 'SET_MOCK_DATA', mockData });
  },
  setFormData: data => {
    dispatch({ type: 'SET_FORM_DATA', data });
  },
  setModuleName: moduleName => {
    dispatch({ type: 'SET_MODULE_NAME', moduleName });
  },
  setActionName: actionName => {
    dispatch({ type: 'SET_ACTION_NAME', actionName });
  },
  handleChange: (e, property, isRequired, pattern, requiredErrMsg, patternErrMsg) => {
    dispatch({
      type: 'HANDLE_CHANGE_FRAMEWORK',
      property,
      value: e.target.value,
      isRequired,
      pattern,
      requiredErrMsg,
      patternErrMsg,
    });
  },
  setLoadingStatus: loadingStatus => {
    dispatch({ type: 'SET_LOADING_STATUS', loadingStatus });
  },
  toggleSnackbarAndSetText: (snackbarState, toastMsg, isSuccess, isError) => {
    dispatch({
      type: 'TOGGLE_SNACKBAR_AND_SET_TEXT',
      snackbarState,
      toastMsg,
      isSuccess,
      isError,
    });
  },
  setDropDownData: (fieldName, dropDownData) => {
    dispatch({ type: 'SET_DROPDWON_DATA', fieldName, dropDownData });
  },
  setDropDownOriginalData: (fieldName, dropDownData) => {
    dispatch({ type: 'SET_ORIGINAL_DROPDWON_DATA', fieldName, dropDownData });
  },
  setRoute: route => dispatch({ type: 'SET_ROUTE', route }),
  delRequiredFields: requiredFields => {
    dispatch({ type: 'DEL_REQUIRED_FIELDS', requiredFields });
  },
  addRequiredFields: requiredFields => {
    dispatch({ type: 'ADD_REQUIRED_FIELDS', requiredFields });
  },
  removeFieldErrors: key => {
    dispatch({ type: 'REMOVE_FROM_FIELD_ERRORS', key });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(assetCategoryCreate);
