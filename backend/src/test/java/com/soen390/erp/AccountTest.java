package com.soen390.erp;

import com.soen390.erp.accounting.model.Account;
import com.soen390.erp.accounting.repository.AccountRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT
)
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class AccountTest {
    @Autowired
    protected MockMvc mockMvc;
    @Autowired
    private AccountRepository accountRepository;

    @Test
    void testAccountcreation(){
        Account account = new Account();
        assertNotNull( account , "should screate an object of type account");
    }

    @Test
    void shouldBeAbletoAddanAccountToRepository(){
        Account account = new Account();
        int count = (int)  accountRepository.count();
        accountRepository.save(account);
        assertEquals(count+1, (int) accountRepository.count(),
                "should be able to create an account");
    }

    @Test
    void shouldBeAbleToDeleteAccount(){
        Account account = new Account();
        int count = (int)  accountRepository.count();
        accountRepository.save(account);
        assertEquals(count+1, (int) accountRepository.count(),
                "should be able to create an account");
        accountRepository.delete(account);
        assertEquals(count, (int) accountRepository.count(),
                "should be able to delete an account");
    }

    @Test
    @WithMockUser(authorities = "ROLE_ADMIN")
    public void testGetAccountById() throws Exception {
        this.mockMvc
                .perform(MockMvcRequestBuilders.get("/account/{id}", 0) .with(csrf()))
                .andDo(MockMvcResultHandlers.print()).andExpect(status().isOk())
                .andReturn();
    }




}
