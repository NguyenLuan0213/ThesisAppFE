import { DrawerContentScrollView, DrawerItem, createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer, useNavigationState } from "@react-navigation/native";
import Home from "./components/Home/Home";
import { useState, useEffect, useCallback, useReducer } from "react";
import SpectificCriteria from "./components/SpectificCriteria/SpectificCriteria";
import Criteria from "./components/Criteria/Criteria";
import Login from "./components/Users/Login";
import MyContext from "./configs/MyContext";
import MyUserReduce from "./reduces/MyUserReduce";
import LogoutButton from "./components/Users/Logout";
import Register from "./components/Users/Register";
import UsersDetail from "./components/Users/User";
import Thesis from "./components/Thesis/Thesis";
import ThesisDetail from "./components/Thesis/ThesisDetail";
import ThesisCreate from "./components/Thesis/ThesisCreate";
import ThesisUpdate from "./components/Thesis/ThesisUpdate";
import StudentDoThesis from "./components/StudentDoThesis/StudentDoThesis";
import AddStudent from "./components/StudentDoThesis/AddStudent";
import StudentDetail from "./components/StudentDoThesis/StudentDetail";
import UpStudent from "./components/StudentDoThesis/UpStudent";
import Grade from "./components/StudentDoThesis/Grade";

const Drawer = createDrawerNavigator();

const useCurrentRouteName = () => {
  const navigationState = useNavigationState(state => state);
  return navigationState.routes[navigationState.index].name;
};

const HeaderRight = () => {
  const currentRoute = useCurrentRouteName();
  return currentRoute !== 'Login' ? <LogoutButton /> : null;
};


const App = () => {
  const [user, dispatch] = useReducer(MyUserReduce, null);
  return (
    <>
      <MyContext.Provider value={[user, dispatch]}>
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerRight: () => <HeaderRight /> }}>
            <Drawer.Screen name='Home' component={Home} options={{ title: 'Trang chủ' }} />
            {user === null ? <>
              <Drawer.Screen name='Login' component={Login} options={{ title: 'Đăng nhập' }} />
              <Drawer.Screen name='Register' component={Register} options={{ title: 'Đăng ký', drawerItemStyle: { display: "none" } }} />
            </> : <>
              <Drawer.Screen name={(user && user.first_name && user.last_name && `${user.first_name} ${user.last_name}`) || "???"} component={UsersDetail} />
            </>}
            <Drawer.Screen name='Logout' component={LogoutButton} options={{ drawerItemStyle: { display: "none" } }} />

            <Drawer.Screen name='Criteria' component={Criteria} options={{ title: 'Tiêu chí chấm điểm' }} />
            <Drawer.Screen name='Spectific' component={SpectificCriteria} options={{ title: 'Tiêu chí chấm điểm cụ thể', drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='Thesis' component={Thesis} options={{ title: 'Khóa Luận' }} />
            <Drawer.Screen name='Student' component={StudentDoThesis} options={{ title: 'Danh sách sinh viên' }} />
            <Drawer.Screen name='ThesisDetail' component={ThesisDetail} options={{ title: 'Chi Tiết Khóa Luận', drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='ThesisCreate' component={ThesisCreate} options={{ title: 'Tạo Khóa Luận', drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='ThesisUpdate' component={ThesisUpdate} options={{ title: 'Cập nhật thông tin', drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='AddStudent' component={AddStudent} options={{ title: 'Thêm sinh viên', drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='StudentDetail' component={StudentDetail} options={{ title: 'Chi tiết sinh viên ', drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='UpdateStudent' component={UpStudent} options={{ title: 'Chỉnh sửa sinh viên ', drawerItemStyle: { display: "none" } }} />
            <Drawer.Screen name='Grade' component={Grade} options={{ title: 'Chấm điểm ', drawerItemStyle: { display: "none" } }} />
          </Drawer.Navigator>
        </NavigationContainer>
      </MyContext.Provider>
    </>
  );
};


export default App;