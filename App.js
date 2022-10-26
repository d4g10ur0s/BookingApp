/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import LinearGradient from 'react-native-linear-gradient';

import React, {Component, useState } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class AppointmentContainer extends Component {

  constructor(props){
    super(props);

    this.state = {
      appointment : this.props.appointment,
    };

  }

  render(){
    return(
      <View
      style = {styles.employerContainer}
      >
      <Text>
        Service Title
      </Text>
      <Text>
        Client Name
      </Text>
      <TouchableOpacity
        style = {styles.myShopButtons}
      >
        <Text>Client Information</Text>
      </TouchableOpacity>
      <Text>
        Start Date
      </Text>
      <Text>
        Employee Name
      </Text>
      <TouchableOpacity
        style = {styles.myShopButtons}
      >
        <Text>Employee Information</Text>
      </TouchableOpacity>
      </View>
      );
  }

}

class AppointmentPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      emp : this.props.emp,
    }

  }

  render(){
    return(
      <View
      style={styles.myShopView}
      >
      <View>
        <TouchableOpacity
          style = {styles.myShopButtons}
          onPress = {this._addServiceForm}
        >
          <Text>Create Appointment</Text>
        </TouchableOpacity>
      </View>
      <AppointmentContainer appointment={null} />
      </View>
      );
  }

}

class ServiceForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      ToU : [false,false],
      title : '',
      duration : '',
      cost : '',
      user_description : '',
      client_description : '',
      toSubmit : false,
    };

    this.setTitle = this.setTitle.bind(this);
    this.setDuration = this.setDuration.bind(this);
    this.setCost = this.setCost.bind(this);
    this.setUserDescription = this.setUserDescription.bind(this);
    this.setClientDescription = this.setClientDescription.bind(this);
    this._checkPrerequesties = this._checkPrerequesties.bind(this);
    this._typeOfUser = this._typeOfUser.bind(this);
  }

  _typeOfUser = async (num) => {
      var arr = [false,false];

      for(i in this.state.ToU){
        if(i == num){
          arr[i] = true;
        }else{
          arr[i] = false;
        }
      }

      await this.setState({
        ToU : arr,
      });

  }

  _checkPrerequesties = async () => {
    if(
      this.state.title.length > 3
      ){
        try {
          parseInt(this.state.cost);
          parseInt(this.state.duration);
          await this.setState({
            toSubmit : true,
          });
          //edw 8elw call back gia save
          this.props.saveService(
            {
              title : this.state.title,
              duration : this.state.duration,
              cost : this.state.cost,
              user_description : this.state.user_description,
              client_description : this.state.client_description,
            }
            );
        }
        catch (err){
          await this.setState({
            toSubmit : false,
          });
        }
    }else{
      await this.setState({toSubmit : false,});
    }

  }

  async setTitle(title){
    await this.setState((props,state) => ({
        title : title,
    }));
  }

  async setDuration(duration){
    await this.setState((props,state) => ({
        duration : duration,
    }));
  }

  async setCost(cost){
    await this.setState((props,state) => ({
        cost : cost,
    }));
  }

  async setUserDescription(user_description){
    await this.setState({
      user_description : user_description,
      });
    }

  async setClientDescription(client_description){
    await this.setState({
        client_description : client_description,
    });
  }

  render(){
    return(
      <View style={styles.addEmployerForm}>
        <Text
        style={{'fontSize' : 20,'margin' : 5,'fontWeight' : '700','color' : '#FFFFFFFF',}}
        >New Service</Text>
        <TextInput
          placeholder = "Title"
          placeholderTextColor="#000"
          style={styles.addEmployeeInp }
          onChangeText={this.setTitle}
        />
        <TextInput
          placeholder = "Cost"
          placeholderTextColor="#000"
          style={styles.addEmployeeInp }
          onChangeText={this.setCost}
        />
        <TextInput
          placeholder = "Duration"
          placeholderTextColor="#000"
          style={styles.addEmployeeInp }
          onChangeText={this.setDuration}
        />
        <Text
        style={styles.serviceFormHeader}
        >
          Your Description
        </Text>
        <TextInput
          placeholder = "Your Description"
          placeholderTextColor="#000"
          style={styles.addServiceDescription }
          onChangeText={this.setUserDescription}
          multiline={true}
        />

        <Text
        style={styles.serviceFormHeader}
        >
          Client's Description
        </Text>
        <TextInput
          placeholder = "Client's Description"
          placeholderTextColor="#000"
          style={styles.addServiceDescription}
          onChangeText={this.setClientDescription}
          multiline={true}
        />
        <View
        style = {styles.addEmployerType}
        >
        <TouchableOpacity
          style = {!this.state.ToU[0] ? styles.deleteEmployerButton : styles.deleteEmployerButtonDisabled}
          onPress = {() => this._typeOfUser(0)}
          disabled={this.state.ToU[0]}
        >
          <Text>Payment in Advance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {!this.state.ToU[1] ? styles.deleteEmployerButton : styles.deleteEmployerButtonDisabled}
          onPress = {() => this._typeOfUser(1)}
          disabled={this.state.ToU[1]}
        >
          <Text>In Shop Payment</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          style = {styles.logFormButtons}
          onPress = {this._checkPrerequesties}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
      );
  }


}

class ServiceContainer extends Component {

  constructor(props){
    super(props);

    this.state={
      serv : this.props.serv,
      num : this.props.num,
    };
  }

  render(){
    return(
      <View
        style={styles.employerContainer}
      >
        <Text
        style={styles.serviceTitle}
        >{this.state.serv.title}</Text>
        <View
        style={styles.serviceInfoView}
        >
          <Text
          style={styles.serviceTextInfo}
          >{'Cost : ' + this.state.serv.cost + ' eur'}</Text>
          <Text
          style={styles.serviceTextInfo}
          >{'Duration : ' +this.state.serv.duration + ' min'}</Text>
        </View>
        <View
        style={styles.serviceDescriptionView}
        >
          <Text
          style={styles.serviceDescriptionHeader}
          >Service Employee Description</Text>
          <Text
          style={styles.serviceDescription}
          >{this.state.serv.user_description}</Text>
        </View>
        <View
        style={styles.serviceDescriptionView}
        >
          <Text
          style={styles.serviceDescriptionHeader}
          >Service Client Description</Text>
          <Text
          style={styles.serviceDescription}
          >{this.state.serv.client_description}</Text>
        </View>
        <View
        style={styles.addEmployerType}
        >
          <TouchableOpacity
            style = {styles.deleteEmployerButton}
            onPress = {this._LogIn}
          >
            <Text>Delete Service</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.appointEmployerButton}
            onPress = {this._LogIn}
          >
            <Text>Modify Service</Text>
          </TouchableOpacity>
        </View>
      </View>
      );
  }

}

class ServicesPage extends Component {

  constructor(props){
    super(props);

    this.state={
      emp : this.props.emp,
      addForm : null,
      content : null,
    };

    this._addServiceForm = this._addServiceForm.bind(this);
    this._saveService = this._saveService.bind(this);
    this._retrieveServices = this._retrieveServices.bind(this);
  }

  componentDidMount(){
    this._retrieveServices();
  }

  _addServiceForm = async () => {
    if(this.state.addForm !== null){
      await  this.setState({
          addForm : null,
      });
    }else{
      await this.setState({
        addForm : <ServiceForm saveService={this._saveService}/>
      });
    }

  }

  _saveService = async (service) => {
    console.log(service);
    try{
      const response = await fetch('http://192.168.1.226:8080/saveService', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(
          {
            service : service,
            emp : this.props.emp,
          }
        ) // body data type must match "Content-Type" header
      });
      var emp = await response.json();

      await this.setState({
        addForm : null,
      });
      //auto 8a phgainei ke vash type of user
      //this._retrieveServices();

    } catch (error) {
      console.log(error);
    }finally{
    }
  }

  renderEmployee(serv,i){
    return(<ServiceContainer serv={serv} num={i} delCallback={this._delService}/>);
  }

  renderServices(serv){
    arr = [];
    for(i in serv){
      arr.push(this.renderEmployee(serv[i],i));
    }
    return arr;
  }

  _retrieveServices = async () => {
    console.log('a');
    var arr = [];
    try{
      const response = await fetch('http://192.168.1.226:8080/retrieveServices', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          shopname : this.state.emp.shopname
        }) // body data type must match "Content-Type" header
      });

      var emp = await response.json();
      console.log(emp);

      arr = await this.renderServices(emp.ap);

    } catch (error) {
      console.log(error);
      //arr = await this.renderDummy();
    }finally{
      await this.setState({
        content : arr,
      });
    }

  }

  render(){
    return(
      <View
      style={styles.myShopView}
      >
      <View>
        <TouchableOpacity
          style = {styles.myShopButtons}
          onPress = {this._addServiceForm}
        >
          <Text>Add Service</Text>
        </TouchableOpacity>
      </View>
        {this.state.addForm}
        {this.state.content}
      </View>
      );
  }

}

class EmployerForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      ToU : [false,false,false],
      name : '',
      sirname : '',
      email : '',
      phone : '',
      toSubmit : false,
    };

    this.setEmail = this.setEmail.bind(this);
    this.setSirname = this.setSirname.bind(this);
    this.setName = this.setName.bind(this);
    this.setPhone = this.setPhone.bind(this);
    this._checkPrerequesties = this._checkPrerequesties.bind(this);
    this._typeOfUser = this._typeOfUser.bind(this);
  }

  _typeOfUser = async (num) => {
      var arr = [false,false,false];

      for(i in this.state.ToU){
        if(i == num){
          arr[i] = true;
        }else{
          arr[i] = false;
        }
      }

      await this.setState({
        ToU : arr,
      });

  }

  _checkPrerequesties = async () => {
    var emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var pasValidRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(
      this.state.email.search(emailValidRegex) > -1
      &&
      this.state.phone.length == 10
      &&
      this.state.name.length > 3
      &&
      this.state.sirname.length > 3
      ){
        await this.setState({
          toSubmit : true,
        });
    }else{
      await this.setState({toSubmit : false,});
    }

    if(this.state.toSubmit){
      var tou = '';
      if(this.state.ToU[0]){
        tou = 'type0';
      }else if(this.state.ToU[1]){
        tou = 'type1';
      }
      else if(this.state.ToU[2]){
        tou = 'type2';
      }

      this.props.saveEmployee({
        type : tou,
        name : this.state.name,
        sirname : this.state.sirname,
        email : this.state.email,
        phone : this.state.phone,
      });
        //refresh
    }

    console.log(this.state.toSubmit);

  }

  async setName(name){
    await this.setState((props,state) => ({
        name : name,
    }));
  }

  async setSirname(sirname){
    await this.setState((props,state) => ({
        sirname : sirname,
    }));
  }

  async setPhone(phone){
    phone=phone.split(' ');
    phone=phone.join("");
    console.log(phone);
    await this.setState({
      phone : phone,
      });
    }

  async setEmail(em){
    em=em.split(' ');
    em=em.join("");
    await this.setState({
        email : em,
    });
  }

  render(){
    return(
      <View
      style={styles.addEmployerForm}
      >
        <Text
        style={{'fontSize' : 20,'margin' : 5,'fontWeight' : '700','color' : '#FFFFFFFF',}}
        >New Employee</Text>
        <TextInput
          placeholder = "Name"
          placeholderTextColor="#000"
          style={styles.addEmployeeInp }
          onChangeText={this.setName}
        />
        <TextInput
          placeholder = "Sirname"
          placeholderTextColor="#000"
          style={styles.addEmployeeInp }
          onChangeText={this.setSirname}
        />
        <TextInput
          placeholder = "E-mail"
          placeholderTextColor="#000"
          style={styles.addEmployeeInp }
          onChangeText={this.setEmail}
        />
        <TextInput
          placeholder = "Phone"
          placeholderTextColor="#000"
          style={styles.addEmployeeInp}
          onChangeText={this.setPhone}
        />
        <View
        style = {styles.addEmployerType}
        >
        <TouchableOpacity
          style = {!this.state.ToU[0] ? styles.deleteEmployerButton : styles.deleteEmployerButtonDisabled}
          onPress = {() => this._typeOfUser(0)}
          disabled={this.state.ToU[0]}
        >
          <Text>Type 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {!this.state.ToU[1] ? styles.deleteEmployerButton : styles.deleteEmployerButtonDisabled}
          onPress = {() => this._typeOfUser(1)}
          disabled={this.state.ToU[1]}
        >
          <Text>Type 2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {!this.state.ToU[2] ? styles.deleteEmployerButton : styles.deleteEmployerButtonDisabled}
          onPress = {() => this._typeOfUser(2)}
          disabled={this.state.ToU[2]}
        >
          <Text>Type 3</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          style = {styles.logFormButtons}
          onPress = {this._checkPrerequesties}
        >
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
      );
  }


}

class EmployerPermissionsView extends Component {

  constructor(props){
    super(props);

    this.state = {
      chosen : [false,false,false],
    }

    this._typeOfUser = this._typeOfUser.bind(this);
  }

  _typeOfUser = async (num) => {
      var arr = [false,false,false];

      for(i in this.state.chosen){
        if(i == num){
          arr[i] = true;
        }else{
          arr[i] = false;
        }
      }

      await this.setState({
        chosen : arr,
      });

  }

  render(){
    return(
      <View
      style = {styles.addEmployerType}
      >
      <TouchableOpacity
        style = {!this.state.chosen[0] ? styles.deleteEmployerButton : styles.deleteEmployerButtonDisabled}
        onPress = {() => this._typeOfUser(0)}
        disabled={this.state.chosen[0]}
      >
        <Text>Type 1</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {!this.state.chosen[1] ? styles.deleteEmployerButton : styles.deleteEmployerButtonDisabled}
        onPress = {() => this._typeOfUser(1)}
        disabled={this.state.chosen[1]}
      >
        <Text>Type 2</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style = {!this.state.chosen[2] ? styles.deleteEmployerButton : styles.deleteEmployerButtonDisabled}
        onPress = {() => this._typeOfUser(2)}
        disabled={this.state.chosen[2]}
      >
        <Text>Type 3</Text>
      </TouchableOpacity>
      </View>
      );
  }

}

class EmployerContainer extends Component {

  constructor(props){
    super(props);

    this.state={
      emp : this.props.emp,
      num : this.props.num,
      employerPermissions : null,
    };

    this._addEmployerPermissionsView = this._addEmployerPermissionsView.bind(this);
  }

  _addEmployerPermissionsView = async () => {
    await this.setState({
      employerPermissions : <EmployerPermissionsView />,
    });
  }

  render(){
    return(
      <View
        style={styles.employerContainer}
      >
      <Text
      style={styles.employeeTextHeader}
      >
        {this.props.emp.name + " " + this.props.emp.sirname}
      </Text>
      <Text
      style={styles.employeeTextInfo}
      >{"Phone Num. " + this.props.emp.phone}</Text>
      <Text
      style={styles.employeeTextInfo}
      >
      {"Employee Appointments : "}</Text>
      <Text
      style={styles.employeeTextInfo}
      >{"Employee Services : "}</Text>
      <ScrollView
        horizontal={true}
        style={styles.addEmployerType}
      >
        <TouchableOpacity
          style = {styles.appointEmployerButton}
          onPress = {this._addEmployerPermissionsView}
        >
          <Text>Employer Permissions</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.appointEmployerButton}
          onPress = {this._LogIn}
        >
          <Text>Appoint to Employee</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style = {styles.deleteEmployerButton}
          onPress = {() => {this.props.delCallback(this.state.emp,this.state.num);}}
        >
          <Text>Delete Employee</Text>
        </TouchableOpacity>
      </ScrollView>
      {this.state.employerPermissions}
      </View>
      );
  }

}

class MyShop extends Component {

  constructor(props){

    super(props);
    this.state = {
      page : [true,false,false],
      formButton : null,
      emp : this.props.emp,
      addForm : null,
      content : null,
      pageHeader : 'Shop Crew',
    };

    this._retrieveEmployers = this._retrieveEmployers.bind(this);
    this._addEmployerForm = this._addEmployerForm.bind(this);
    this.saveEmployee = this.saveEmployee.bind(this);
    this._delEmployee = this._delEmployee.bind(this);
    this._retrieveClients = this._retrieveClients.bind(this);
    this._renderFormButton = this._renderFormButton.bind(this);

  }

  saveEmployee = async (emp) => {
    emp.shopname = this.state.emp.shopname;
    try{
      const response = await fetch('http://192.168.1.226:8080/saveEmployee', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(
          emp
        ) // body data type must match "Content-Type" header
      });
      var emp = await response.json();

      await this.setState({
        addForm : null,
      });
      this._retrieveEmployers();

    } catch (error) {
      console.log(error);
    }finally{
    }
  }

  componentDidMount(){
    if(this.state.page[0]){
      this._retrieveEmployers();
    }else if (this.state.page[1]){
      console.log('page1');
    }else if (this.state.page[2]){
      console.log('page2');
    }
  }

  renderDummy(){
    return(<EmployerContainer emp={{
      name : '',
      sirname : '',
      phone : '',
    }}/>);
  }

  _toShopClients = () => {
    this._retrieveClients();
  }

  _retrieveClients = async () => {
    this.setState({
        content : null,
        page : [false,true,false],
        formButton : null,
        pageHeader : 'Shop Clients',
        addForm : null,
      });
  }

  _toShopCrew = () => {
    this._retrieveEmployers();
  }

  _retrieveEmployers = async () => {
    var arr = [];
    try{
      const response = await fetch('http://192.168.1.226:8080/retrieveEmployees', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          id : this.state.emp.id,
          shopname : this.state.emp.shopname
        }) // body data type must match "Content-Type" header
      });

      var emp = await response.json();
      console.log(emp);

      arr = await this.renderEmployees(emp.ap);

    } catch (error) {
      console.log(error);
      arr = await this.renderDummy();
    }finally{
      var arr2 = [true,false,false];
      await this.setState({
        content : arr,
        page : arr2,
        pageHeader : 'Shop Crew',
        addForm : null,
        formButton : null,
      });
      this._renderFormButton();
    }

  }

  _delEmployee = async (emp , num) => {
    var arr = [];
    try{
      const response = await fetch('http://192.168.1.226:8080/deleteEmployee', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          emp
        }) // body data type must match "Content-Type" header
      });

    } catch (error) {
      console.log(error);
      arr = this.state.content;
      arr.pop(num);
    }finally{
      await this.setState({
        content : arr,
      });
    }

    this._retrieveEmployers();
  }

  renderEmployees(emp){
    arr = [];
    for(i in emp){
      arr.push(this.renderEmployee(emp[i],i));
    }
    return arr;
  }

  renderEmployee(emp,i){
    return(<EmployerContainer emp={emp} num={i} delCallback={this._delEmployee}/>);
  }

  _addEmployerForm = async () => {
    if(this.state.addForm !== null){
      await  this.setState({
          addForm : null,
      })
    }else{
      await  this.setState({
          addForm : <EmployerForm saveEmployee={this.saveEmployee}/>,
      });
    }

  }

  renderButton(){
    return(
      <TouchableOpacity
      style = {styles.myShopButtons}
      onPress = {this._addEmployerForm}
      >
      <Text>Add Employee</Text>
      </TouchableOpacity>
      );
  }

  _renderFormButton = async () => {
    if(this.state.page[0]){
      var a = await this.renderButton();
      await this.setState({
        formButton : a,
      });
    }else{
      await this.setState({
        formButton : null,
      });
    }
  }

  render(){
    return(
      <View
      style={styles.myShopView}
      >
        <View
        style={{padding : 10,flex : 2,flexDirection : 'row',}}
        contentInsetAdjustmentBehavior="automatic"
        >
        <TouchableOpacity
          disabled={this.state.page[0]}
          style = {!this.state.page[0] ? styles.myShopButtons : styles.myShopButtonsDisabled}
          onPress = {this._toShopCrew}
        >
          <Text>Shop Crew</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={this.state.page[1]}
          style = {!this.state.page[1] ? styles.myShopButtons : styles.myShopButtonsDisabled}
          onPress = {this._toShopClients}
        >
          <Text>Shop Clients</Text>
        </TouchableOpacity>
        {this.state.formButton}
        </View>
        <Text
        style={styles.myShopHeader}
        >
          {this.state.pageHeader}
        </Text>
        {this.state.addForm}
        {this.state.content}
      </View>
      );
  }

}

//1st page of employer || employee
class CalendarDay extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View
      style={styles.calendarDayView}
      >
      <TouchableOpacity
        style = {styles.dayCell}
      >
        <Text>
          {this.props.num + '\n' + 'NoA ' + '1'}
        </Text>
      </TouchableOpacity>
      </View>
    );
  }

}

class ServiceCalendar extends Component {

  constructor(props){
    super(props);
    this.state = {
      days : null,
      daynames : null,
    }

    this.renderDays = this.renderDays.bind(this);

    this.renderDays();
  }

  rDayHeader(d){
    return (<Text style={styles.dayHeader}>{d.slice(0,3)}</Text>);
  }

  rDay(num, dname){
    return (<CalendarDay num={num} dname={dname}/>);
  }

  renderDays(){
    var arr = [];
    var dow = [ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    for(var i in dow){
      arr.push(this.rDayHeader(dow[i]));
    }
    this.state.daynames = arr;

    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
    var day_num = [];
    for(var i = 0; i<(firstDay.getDay() - 1); i++){
      day_num.push(this.rDay(' '));
    }//gia na valw kena

    for(i = 1; i<=lastDay; i++){
      day_num.push(this.rDay(i,dow[(day_num.length)%7]));//mod
    }

    var stath = 35 - day_num.length;
    for(i=0; i<stath; i++){
      day_num.push(this.rDay(' '));
    }

    this.state.days = day_num;

  }

  render(){
    return(
      <View
      style = {styles.calendarLayout}
      >
        <Text
        style={styles.monthHeader}
        >
          {new Date().toLocaleDateString(undefined,{month : 'long'}) + "  , " + new Date().toLocaleDateString(undefined,{year : 'numeric'})}
        </Text>
        <View
        style={styles.calendarRow}
        >
        {this.state.daynames}
        </View>
        <View
        style={styles.calendarRow}
        >
        {this.state.days.slice(0,7)}
        </View>
        <View
        style={styles.calendarRow}
        >
        {this.state.days.slice(7,14)}
        </View>
        <View
        style={styles.calendarRow}
        >
        {this.state.days.slice(14,21)}
        </View>
        <View
        style={styles.calendarRow}
        >
        {this.state.days.slice(21,28)}
        </View>
        <View
        style={styles.calendarRow}
        >
        {this.state.days.slice(28,35)}
        </View>
      </View>
      );
  }

}

class EmployerPage extends Component {

  constructor(props){
    super(props);

    this.state = {
      emp : this.props.emp,
      content : <ServiceCalendar />,
    }

    this._toMyShop = this._toMyShop.bind(this);
    this._toCalendar = this._toCalendar.bind(this);
    this._toServices = this._toServices.bind(this);
    this._toAppointments = this._toAppointments.bind(this);
  }

  _toAppointments = async () => {
    await this.setState({
        content : <AppointmentPage emp={this.state.emp}/>,
      });
  }

  _toMyShop = async () => {
    await this.setState({
        content : <MyShop emp={this.state.emp}/>,
      });
  }

  _toCalendar = async () => {
    await this.setState({
      content : <ServiceCalendar />,
    });
  }

  _toServices = async () => {
    await this.setState({
      content : <ServicesPage emp={this.state.emp}/>,
      });
  }

  render(){
    return(
      <LinearGradient
      colors={['#0fa496', '#013765']}
      style ={{
        justifyContent: "center",
        alignItems: "center",
        borderRadius : 8,
        flex : 1,
        }}
      >
        <Text style={styles.logFormHeader}>
          {"Hello " + this.props.emp.name + ' ' + this.props.emp.sirname}
        </Text>
        <View
        style={styles.logFormButtonSection}
        >
          <TouchableOpacity
            style = {styles.employerOptionButtons}
            onPress = {this._toCalendar}
          >
            <Text>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.employerOptionButtons}
            onPress = {this._toAppointments}
          >
            <Text>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.employerOptionButtons}
            onPress = {this._toServices}
          >
            <Text>Services</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.employerOptionButtons}
            onPress = {this._toMyShop}
          >
            <Text>My Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style = {styles.employerOptionButtons}
            onPress = {this._LogIn}
          >
            <Text>Options</Text>
          </TouchableOpacity>
        </View>
        {this.state.content}
      </LinearGradient>
    );
  }


}

class LogInForm extends Component {

  constructor(props){
    super(props);

    this.state = {
      email : '',
      password : '',
      toSubmit : false,
    };

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this._LogIn = this._LogIn.bind(this);
    this._checkPrerequesties = this._checkPrerequesties(this);
  }

  async setPassword(pass){
    await this.setState((props,state) => ({
        password : pass,
    }));
  }

  async setEmail(em){
    await this.setState((props,state) => ({
        email : em,
    }));
  }

  async _checkPrerequesties(){
    var emailValidRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var pasValidRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if(
      this.state.email.search(emailValidRegex) > -1
      &&
      this.state.password.search(pasValidRegex) > -1
      ){
        alert(this.state.toSubmit);
        await this.setState((props,state) => ({
          toSubmit : true,
        }));
    }else{
      this.state.toSubmit = false;
    }

  }

  async _LogIn(){

    //await this._checkPrerequesties();
    //if(this.state.toSubmit){
      //this.props.empLogIn(this.state.email,this.state.password);
      this.props.empLogIn("aledadu@hotmail.com","Den8aKsexasw");
    //}
  }

  render(){

  return (
    <View
    style ={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor : '#555555AD',
      borderRadius : 8,
      marginTop : 85,
      marginBottom : 85,
      marginRight : 25,
      marginLeft : 25,
      }}
    >
      <Text style={styles.logFormHeader}>
        Log In
      </Text>
      <TextInput
      placeholder = "E-Mail"
      placeholderTextColor="#000"
      style={styles.logFormInput}
      onChangeText={this.setEmail}
      />
      <TextInput
      placeholder = "Password"
      placeholderTextColor="#000"
      style={styles.logFormInput}
      onChangeText={this.setPassword}
      />
      <View
      style={styles.logFormButtonSection}
      >
        <TouchableOpacity
        style = {styles.logFormButtons}
        onPress = {this._LogIn}
        >
        <Text>
        Log In
        </Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }

}

export default class App extends Component {

  constructor(props){

    super(props);

    this.state = {
      main_content : <LogInForm empLogIn={this._employerLogIn}/> ,
    }

    this._employerLogIn = this._employerLogIn.bind(this);
  }

  _employerLogIn = async (email, password) => {
    // Default options are marked with *

    try{
      const response = await fetch('http://192.168.1.226:8080/employerLogIn', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({
          email : email,
          password : password
        }) // body data type must match "Content-Type" header
      });

      var emp = await response.json();
      emp = emp.ap;
      console.log(emp);
      await this.setState({
        main_content : <EmployerPage emp={emp[0]}/>,
      });

    } catch (error) {
      console.log(error);
      await this.setState({
        main_content : <EmployerPage />,
      });
    }finally{

    }


  }
  render(){

    return (
        <SafeAreaView style={{backgroundColor : '#000000AD'}}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={'#000000AD'}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={{backgroundColor : '#000000AD'}}>
            <View
              style={{
                flex : 1,
                backgroundColor: Colors.black,
              }}>
              {this.state.main_content}
            </View>
          </ScrollView>
        </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  logFormHeader: {
    fontSize: 30,
    fontWeight: '600',
    color : '#FFFFFFFF',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  logFormInput: {
    backgroundColor : '#FFFFFFFF',
    color : '#000000FF',
    marginTop : 10,
    marginBottom : 10,
    borderRadius : 8,
    width : 210,
  },
  logFormButtonSection:{
    flexDirection : "row",
  },
  logFormButtons : {
    backgroundColor : '#5566FFFF',
    padding : 10,
    borderRadius : 8,
    margin : 10,
  },
  employerOptionButtons:{
    fontSize : 8,
    backgroundColor : '#5566FFFF',
    padding : 3,
    borderRadius : 8,
    margin : 5,
  },
  calendarLayout:{
    flex : 1,
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: '#000000AD',
    borderRadius : 8,
  },
  monthHeader:{
    color : '#FFFFFFFF',
    fontSize : 25,
    fontWeight: '400',
    textAlign: "center",
  },
  dayHeader:{
    flex : 7,
    fontSize : 15,
    fontWeight : '600',
    borderRadius : 8,
    textAlign: "center",
    margin : 1,
  },
  calendarRow:{
    flexDirection : "row",
  },
  calendarDayView : {
    flex : 7,
    alignItems: "center",
  },
  dayCell : {
    width : '90%',
    fontSize : 10,
    alignItems : 'center',
    backgroundColor : '#5743daFF',
    margin : 2,
    padding : 2,
    borderWidth : 2,
    borderRadius : 4,
  },
  myShopView : {
    flex : 1,
    width : '100%',
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor: '#0000007A',
    borderRadius : 8,
  },
  myShopButtons : {
    fontSize : 10,
    padding : 5,
    margin : 5,
    borderRadius : 8,
    backgroundColor : '#5743daFF',
  },
  myShopButtonsDisabled : {
    fontSize : 10,
    padding : 5,
    margin : 5,
    borderRadius : 8,
    backgroundColor : '#5743da77',
  },
  myShopHeader : {
    fontSize : 25,
    color : '#FFFFFFAD',
    fontWeight : '700',
  },
  employerContainer : {
    width : '85%',
    alignItems : 'center',
    margin : 10,
    borderRadius : 8,
    backgroundColor : '#000000AD',
  },
  deleteEmployerButton : {
    alignSelf : 'flex-start',
    fontSize : 10,
    padding : 5,
    margin : 15,
    borderRadius : 8,
    backgroundColor : '#A34755FF',
  },
  deleteEmployerButtonDisabled : {
    alignSelf : 'flex-start',
    fontSize : 10,
    padding : 5,
    margin : 15,
    borderRadius : 8,
    backgroundColor : '#A3475577',
  },
  addEmployerForm : {
    width : '85%',
    backgroundColor : '#000000AD',
    margin : 5,
    alignItems : 'center',
    justifyContent : 'center',
    borderRadius : 8,
  },
  addEmployerType : {
    flexDirection : 'row',
  },
  appointEmployerButton : {
    alignSelf : 'flex-end',
    fontSize : 10,
    padding : 5,
    margin : 15,
    borderRadius : 8,
    backgroundColor : '#5743daFF',
  },
  addEmployeeInp : {
    fontSize : 15,
    backgroundColor : '#FFFFFFFF',
    color : '#000000FF',
    marginTop : 5,
    marginBottom : 5,
    borderRadius : 8,
    width : 210,
  },
  employeeTextInfoGradient : {
    margin : 10,
    borderRadius : 8,
    width : '80%',
  },
  employeeTextHeader :{
    margin : 5,
    fontSize : 20,
    fontWeight : '700',
    textAlign : 'center',
  },
  employeeTextInfo : {
    margin : 5,
    fontSize : 15,
    fontWeight : '700',
    textAlign : 'center',
  },
  serviceTextInfo : {
    margin : 5,
    fontSize : 15,
    fontWeight : '700',
    textAlign : 'center',
  },
  serviceInfoView : {
    flexDirection : 'row',
  },
  serviceDescription : {
    margin : 5,
    fontSize : 12,
    fontWeight : '700',
    textAlign : 'center',
  },
  serviceDescriptionView : {
    backgroundColor : "#000000AD",
    margin : 10,
    borderRadius : 8,
    width : '80%',
  },
  serviceDescriptionHeader : {
    margin : 5,
    fontSize : 15,
    fontWeight : '700',
    textAlign : 'center',
  },
  serviceTitle : {
    fontSize : 25,
    fontWeight : '700',
    textAlign : 'center',
  },
  addServiceDescription : {
    fontSize : 15,
    backgroundColor : '#FFFFFFFF',
    color : '#000000FF',
    marginTop : 10,
    marginBottom : 10,
    borderRadius : 8,
    width : 280,
    padding : 5,
  },
  serviceFormHeader : {
    fontSize : 20,
    fontWeight : '700',
    color : "#A7457AFF",
  },
});
