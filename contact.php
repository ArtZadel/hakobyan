<!DOCTYPE HTML>
<html lang="hy">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, viewport-fit=cover" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="description" content="some description about project">
    <title>Hakobyan</title>
    <link rel="stylesheet" href="css/datepicker.material.css">
    <link rel="stylesheet" href="css/nice-select2.css">
    <link rel="stylesheet" href="css/contact/index.css">
    <link rel="stylesheet" media="screen and (min-width: 1025px)" href="css/contact/index-l.css">
    <link rel="stylesheet" media="screen and (max-width: 1024px)" href="css/contact/index-m.css">
    <?php
    include 'templates/favicons.php'
    ?>
</head>

<body>
    <?php
    include 'templates/header.php'
    ?>
    <div class="content">
        <div class="contact_page">
            <div class="breadcrumbs">
                <div class="page_container">
                    <ul>
                        <li><a href="index.php">Home</a></li>
                        <li>
                            <div>Contact Us</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="page_container animation_block firstSection">
                <div class="animation_step">
                    <ul class="filter_contact">
                        <li class="active"><a href="">contact us</a></li>
                        <li><a href="">Request a meet</a></li>
                    </ul>
                    <div class="contact_section">
                        <div class="page_row ">
                            <div class="left_block">
                                <div class="description_sub">Have questions or suggestions? Want to write a feedback? Fill out the form, we are always in touch!</div>
                                <form class="field_row">
                                    <div class="field_block">
                                        <span class="field_name">First name</span>
                                        <input type="text" name="fullname" aria-label="Your First Nam" placeholder="Your First Name" autocomplete="off" maxlength="50" data-validation="required" />
                                        <span class="error_hint">mandatory field</span>
                                    </div>
                                    <div class="field_block">
                                        <span class="field_name">Last name</span>
                                        <input type="text" name="fullname" aria-label="Your Last Name" placeholder="Your Last Name" autocomplete="off" maxlength="50" data-validation="required" />
                                        <span class="error_hint">mandatory field</span>
                                    </div>
                                    <div class="field_block select_block">
                                        <span class="field_name">Service</span>
                                        <select name="" class="city_select" title="" aria-label="Service" data-validation="required">
                                            <option value="" disabled selected>Please, select</option>
                                            <option value="1">⁠Small Business Bookkeeping & Cloud Accounting</option>
                                            <option value="2">Payroll Services</option>
                                            <option value="3">⁠⁠Tax Services</option>
                                            <option value="5">⁠Small Business Consulting</option>
                                            <option value="6">CFO Services</option>
                                        </select>
                                        <span class="error_hint">mandatory field</span>
                                    </div>
                                    <div class="field_block">
                                        <span class="field_name">E-mail</span>
                                        <input type="text" name="email" aria-label="example@gmail.com" placeholder="example@gmail.com" autocomplete="off" maxlength="50" data-validation="email" />
                                        <span class="error_hint">
                                            <span class="standard_hint">mandatory field</span>
                                            <span class="individual_hint">wrong email</span>
                                        </span>
                                    </div>
                                    <div class="field_block">
                                        <span class="field_name">Contact phone number</span>
                                        <input type="text" aria-label="Phone number" placeholder="(555) 555-5555" name="telephone" maxlength="9" data-validation="required" autocomplete="off" oninput="this.value=this.value.replace(/[^0-9]/g,'');">
                                        <span class="error_hint">mandatory field</span>
                                    </div>
                                    <div class="field_block">
                                        <span class="field_name">Date and Time</span>
                                        <input type="text" id="date_picker" aria-label="Date and Time" autocomplete="off" name="date" placeholder="Date and Time" data-validation="required" />
                                        <span class="error_hint">mandatory field</span>
                                    </div>
                                    <div class="field_block full_field">
                                        <span class="field_name">Message</span>
                                        <textarea name="message" maxlength="500" aria-label="message" autocomplete="off" data-validation="required"></textarea>
                                        <span class="error_hint">mandatory field</span>
                                    </div>
                                    <div class="checkbox_block full_field">
                                        <label>
                                            <input name="checkBtn" aria-label="checkbox" type="checkbox" class="filled" data-validation="required">
                                            <span class="check_btn">I agree to <a href="" target="_blank">Privacy Policy</a> </span>
                                        </label>
                                    </div>
                                    <div class="field_block full_field">
                                        <button class="validate_btn secondary_btn" aria-label="SEND MESSAGE">SEND MESSAGE</button>
                                    </div>
                                </form>
                            </div>
                            <div class="right_block">
                                <div class="inner_block">
                                    <img src="images/contact.jpg" srcset="images/contact.jpg 1x, images/contact.jpg 2x" width="520" height="723" alt="alt" title="title">
                                    <ul>
                                        <li><a href="#" class="icon_call">(800) 336-3053</a></li>
                                        <li><a href="#" class="icon_mail">info@hakobyan.consulting</a></li>
                                        <li><a href="#" class="icon_pin">2102 Floyd Str, Burbank,CA 91504</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php
    include 'templates/footer.php'
    ?>
    <script src="js/datepicker.js"></script>
    <script type="module" src="js/index.js"></script>
</body>

</html>