package com.wolftech.web;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest @AutoConfigureMockMvc
class HomeControllerTest {
    @Autowired MockMvc mvc;
    @Test void rendersHomePage() throws Exception { mvc.perform(get("/")).andExpect(status().isOk()).andExpect(view().name("index")).andExpect(content().string(org.hamcrest.Matchers.containsString("PIONEERING"))); }
    @Test void acceptsValidContact() throws Exception { mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content("{\"name\":\"Ada\",\"email\":\"ada@example.com\",\"message\":\"Build the future\"}")).andExpect(status().isCreated()).andExpect(jsonPath("$.status").value("transmission_received")); }
    @Test void rejectsInvalidContact() throws Exception { mvc.perform(post("/api/contact").contentType(MediaType.APPLICATION_JSON).content("{\"name\":\"\",\"email\":\"bad\",\"message\":\"\"}")).andExpect(status().isBadRequest()); }
    @Test void acceptsCareerApplication() throws Exception {
        MockMultipartFile resume = new MockMultipartFile("resume", "cv.pdf", "application/pdf", "candidate cv".getBytes("UTF-8"));
        mvc.perform(multipart("/api/applications").file(resume).param("name","Ada Lovelace").param("email","ada@example.com").param("phone","0771234567").param("position","Business Promotion Agent").param("message","Ready to contribute."))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.status").value("application_received"));
    }
    @Test void rendersEveryLinkedPage() throws Exception {
        String[] paths={"/development","/voip","/arts","/marketing","/careers","/about","/legal","/support","/contact"};
        for(String path:paths) mvc.perform(get(path)).andExpect(status().isOk());
    }
}
