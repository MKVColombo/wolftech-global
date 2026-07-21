package com.wolftech.web;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.Year;
import java.util.List;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.Map;

@Controller
@Validated
public class HomeController {
    @GetMapping("/")
    String home(Model model) {
        model.addAttribute("year", Year.now().getValue());
        model.addAttribute("services", Arrays.asList(
                new Service("01", "Development", "CODE / CLOUD / SYSTEMS", "Architecting high-performance digital ecosystems with precision and scale.", "development", "development"),
                new Service("02", "VoIP", "VOICE / SIP / SECURITY", "Next-generation secure communication infrastructures for global enterprises.", "voip", "voip"),
                new Service("03", "Arts", "IDENTITY / MOTION / 3D", "Visual identity engineering and creative storytelling through digital mediums.", "arts", "arts"),
                new Service("04", "Marketing", "DATA / GROWTH / SIGNAL", "Algorithmic growth systems and data-centric brand acceleration strategies.", "marketing", "marketing")
        ));
        return "index";
    }

    @GetMapping("/{module:development|voip|arts|marketing}")
    String module(@PathVariable String module, Model model) {
        Map<String, ModulePage> pages = new LinkedHashMap<>();
        pages.put("development", new ModulePage("01", "CORE", "DEV", "development", "Architecting the digital backbone of next-generation enterprises through high-frequency engineering.", "Initialize Project?", "Connect with our engineering HQ to discuss your next digital evolution.", "Start Transmission", Arrays.asList(
                new Capability("Web Development", "Modern, responsive web applications using cutting-edge technologies like Next.js, React, and TypeScript.", "React / Next.js / Performance"), new Capability("Mobile Apps", "Native and cross-platform mobile applications for iOS and Android with seamless user experiences.", "React Native / Flutter / UX"), new Capability("Cloud Solutions", "Scalable cloud infrastructure and deployment solutions using AWS, Azure, and Google Cloud Platform.", "AWS / DevOps / Scaling"), new Capability("Custom Software", "Tailored software solutions designed specifically for unique business requirements and workflows.", "Enterprise / Bespoke / Security"))));
        pages.put("voip", new ModulePage("02", "VIRTUAL", "VOICE", "voip", "Pioneering crystal-clear, enterprise-grade VoIP infrastructures for global enterprise connectivity.", "Connect HQ?", "Experience the future of enterprise communication today.", "Configure VoIP", Arrays.asList(
                new Capability("Call Centers", "Advanced call center solutions with intelligent routing, analytics, and CRM integration.", "AI Routing / Analytics / CRM"), new Capability("Unified Comms", "Voice, video, messaging, and collaboration tools unified in one platform.", "Video / Chat / Omni"), new Capability("Secure Comms", "End-to-end encrypted communications ensuring privacy and industry compliance.", "E2EE / HIPAA / Privacy"), new Capability("Cloud PBX", "Flexible cloud phone systems with advanced features and 99.9% uptime.", "High Uptime / Scalable / Global"))));
        pages.put("arts", new ModulePage("03", "GLOBAL", "ARTS", "arts", "Engineering visual experiences that redefine digital boundaries and captivate global audiences.", "Create Extraordinary?", "Translate your creative vision into high-frequency visual reality.", "Begin Arts Module", Arrays.asList(
                new Capability("Graphic Design", "Eye-catching logos, brand materials, and visual identities that stand apart.", "Branding / Vector / Print"), new Capability("Video Production", "Professional video content from concept to final cut, animation, and motion graphics.", "4K / Editing / Motion"), new Capability("3D Visualization", "Photorealistic renders and animations for products and architecture.", "Unreal Engine / Blender / CGI"), new Capability("UI/UX Design", "Intuitive interfaces designed around experience and accessibility.", "Figma / Interaction / System"))));
        pages.put("marketing", new ModulePage("04", "GROWTH", "MARKET", "marketing", "Engineering algorithmic growth engines and data-centric brand acceleration for global scale.", "Amplify Brand?", "Connect with our marketing specialists to scale your digital presence globally.", "Execute Strategy", Arrays.asList(
                new Capability("SEO & SEM", "Strategic search optimization and marketing that drives qualified traffic.", "Search / Visibility / Ads"), new Capability("Analytics", "Data analysis and reporting that optimizes campaigns and maximizes ROI.", "Data / Insights / Growth"), new Capability("Social Media", "Strategies that build communities and convert followers into customers.", "Community / Viral / Engage"), new Capability("Growth Marketing", "Creative, data-led growth systems designed for rapid expansion.", "Scale / Innovation / Data"))));
        model.addAttribute("page", pages.get(module)); model.addAttribute("year", Year.now().getValue());
        return "module";
    }

    @GetMapping("/{page:careers|about|legal|support|contact}")
    String information(@PathVariable String page, Model model) {
        Map<String, InfoPage> pages = new LinkedHashMap<>();
        if ("careers".equals(page)) { model.addAttribute("year", Year.now().getValue()); return "careers"; }
        pages.put("about", new InfoPage("ABOUT THE SYSTEM", "WolfTech Global is an innovation studio engineering future-ready digital ecosystems from Colombo to the world.", "GLOBAL ENGINEERING HQ", "Systems Online", "Development / Communication / Arts / Growth", "We bring technical precision and creative thinking together to build products, infrastructure, and brands with measurable global impact.", "CONNECT WITH HQ"));
        pages.put("legal", new InfoPage("LEGAL PROTOCOL", "The operational terms that protect our clients, users, systems, and intellectual property.", "TERMS & PRIVACY", "Protocol v4.0", "Privacy / Security / Acceptable Use", "Information submitted through this site is used only to answer enquiries and deliver requested services. Project-specific ownership and confidentiality terms are defined in each client agreement.", "CONTACT LEGAL"));
        pages.put("support", new InfoPage("DIRECT SUPPORT", "Open a priority channel with the WolfTech systems team.", "SUPPORT MATRIX", "Channel Open", "Technical / Accounts / Projects", "Describe the affected system, expected behavior, and urgency. Our operations team will route your transmission to the correct module.", "START TRANSMISSION"));
        pages.put("contact", new InfoPage("CONNECT HQ", "Establish a secure line with our global systems and innovation studio.", "NEW TRANSMISSION", "Secure Channel", "Colombo / Sri Lanka / Global", "Tell us what you are building, the challenge you need solved, and the outcome you want to create.", "OPEN CONTACT FORM"));
        model.addAttribute("info", pages.get(page)); model.addAttribute("pageKey", page); model.addAttribute("year", Year.now().getValue());
        return "info";
    }

    @PostMapping("/api/contact")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    Map<String, Object> contact(@Valid @RequestBody ContactRequest request) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "transmission_received");
        response.put("message", "Signal received. Our team will respond shortly.");
        response.put("timestamp", Instant.now().toString());
        return response;
    }

    @PostMapping(value = "/api/applications", consumes = "multipart/form-data")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    Map<String, Object> application(@RequestParam @Size(max=80) String name,
                                    @RequestParam @Email @Size(max=160) String email,
                                    @RequestParam @Size(max=40) String phone,
                                    @RequestParam @Size(max=120) String position,
                                    @RequestParam @Size(max=2000) String message,
                                    @RequestParam MultipartFile resume) {
        if (name.trim().isEmpty() || email.trim().isEmpty() || position.trim().isEmpty() ||
                resume.isEmpty() || resume.getSize() > 5 * 1024 * 1024) {
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.BAD_REQUEST, "Complete all required fields and attach a CV under 5 MB.");
        }
        String filename = resume.getOriginalFilename() == null ? "resume" : resume.getOriginalFilename();
        String lower = filename.toLowerCase();
        if (!(lower.endsWith(".pdf") || lower.endsWith(".doc") || lower.endsWith(".docx"))) {
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.BAD_REQUEST, "CV must be PDF, DOC, or DOCX.");
        }
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("status", "application_received");
        response.put("message", "Application received. Talent HQ will review your transmission.");
        response.put("reference", "WT-" + Instant.now().toEpochMilli());
        response.put("timestamp", Instant.now().toString());
        return response;
    }

    public static class Service {
        private final String number, title, tag, description, symbol, slug;
        Service(String number, String title, String tag, String description, String symbol, String slug) { this.number=number; this.title=title; this.tag=tag; this.description=description; this.symbol=symbol; this.slug=slug; }
        public String getNumber(){return number;} public String getTitle(){return title;} public String getTag(){return tag;} public String getDescription(){return description;} public String getSymbol(){return symbol;}
        public String getSlug(){return slug;}
    }
    public static class Capability { private final String title, description, tags; Capability(String title,String description,String tags){this.title=title;this.description=description;this.tags=tags;} public String getTitle(){return title;} public String getDescription(){return description;} public String getTags(){return tags;} }
    public static class ModulePage { private final String number,lead,accent,glyph,description,cta,ctaDescription,action; private final List<Capability> capabilities; ModulePage(String number,String lead,String accent,String glyph,String description,String cta,String ctaDescription,String action,List<Capability> capabilities){this.number=number;this.lead=lead;this.accent=accent;this.glyph=glyph;this.description=description;this.cta=cta;this.ctaDescription=ctaDescription;this.action=action;this.capabilities=capabilities;} public String getNumber(){return number;} public String getTitle(){return lead+" "+accent;} public String getLead(){return lead;} public String getAccent(){return accent;} public String getGlyph(){return glyph;} public String getDescription(){return description;} public String getCta(){return cta;} public String getCtaDescription(){return ctaDescription;} public String getAction(){return action;} public List<Capability> getCapabilities(){return capabilities;} }
    public static class InfoPage { private final String title,intro,panel,status,meta,body,action; InfoPage(String title,String intro,String panel,String status,String meta,String body,String action){this.title=title;this.intro=intro;this.panel=panel;this.status=status;this.meta=meta;this.body=body;this.action=action;} public String getTitle(){return title;} public String getIntro(){return intro;} public String getPanel(){return panel;} public String getStatus(){return status;} public String getMeta(){return meta;} public String getBody(){return body;} public String getAction(){return action;} }
    public static class ContactRequest {
        @NotBlank @Size(max=80) private String name;
        @NotBlank @Email @Size(max=160) private String email;
        @NotBlank @Size(max=2000) private String message;
        public String getName(){return name;} public void setName(String name){this.name=name;}
        public String getEmail(){return email;} public void setEmail(String email){this.email=email;}
        public String getMessage(){return message;} public void setMessage(String message){this.message=message;}
    }
}
