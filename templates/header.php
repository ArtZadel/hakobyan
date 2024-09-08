<div class="header">
    <div class="header_inner">
        <div class="page_container">
            <div class="header_block">
                <div class="main_logo">
                    <?php if (strpos($_SERVER['SCRIPT_FILENAME'], 'index.php') == false) : ?> <a href="index.php">Company
                        name<?php endif ?>
                        <span class="web_version">
                             <img src="css/images/logo_white.svg" width="199" height="53" alt="" title="" />
                             <img src="css/images/logo_blue.svg" class="fix_logo" width="199" height="53" alt="" title="" />
                        </span>

                        <span class="mobile_version">
                             <img src="css/images/mobile_white.svg" width="199" height="53" alt="" title="" />
                             <img src="css/images/mobile_blue.svg" class="fix_logo" width="199" height="53" alt="" title="" />
                        </span>
                        <?php if (strpos($_SERVER['SCRIPT_FILENAME'], 'index.php') == false) : ?>
                    </a><?php endif ?>
                </div>
                <div class="menu_block">
                    <div class="menu_inner">
                        <ul class="main_menu">
                            <li><a href="about.php">ABOUT US</a></li>
                            <li><a href="services.php">SERVICES</a></li>
                            <li><a href="testimonials.php">TESTIMONIALS</a></li>
                            <li><a href="blog.php">BLOG</a></li>
                            <li><a href="contact.php">CONTACT US</a></li>
                        </ul>
                    </div>
                </div>
                <div class="lg_block drop_block">
                    <button class="drop_btn icon_down" aria-label="կայքի լեզու">EN</button>
                    <div class="drop_inner">
                        <ul>
                            <li><a href="#">Fr</a></li>
                            <li><a href="#">EN</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <button class="menu_btn" aria-label="mobile menu btn"><span></span></button>
        </div>
    </div>
</div>
