package com.soen390.erp;

import com.soen390.erp.email.model.EmailToSend;
import com.soen390.erp.email.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ComponentScans;
import org.springframework.context.event.EventListener;

@SpringBootApplication
public class EnterpriseResourcePlanningApplication {

    public static void main(String[] args) {
        SpringApplication.run(EnterpriseResourcePlanningApplication.class, args);
    }




}