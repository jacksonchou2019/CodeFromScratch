package com.example.demo.service;

import hprose.common.HproseMethods;
import hprose.server.HproseServlet;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.servlet.annotation.WebServlet;

@WebServlet(urlPatterns = {"/hprose/service"})
public class ServicePublish extends HproseServlet {

    @Override
    protected void setGlobalMethods(HproseMethods methods){
        super.setGlobalMethods(methods);

        Service service=new Service();
        methods.addMethod("sayHello",service);
        methods.addMethod("testHello",service);
//        methods.addInstanceMethods(service);
    }
}
