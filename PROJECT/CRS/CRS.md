## Version Control

|Version|Date|Author|Comment|
|-----|-----------|------------|---------------------|
|1.0|06.10.2023|Simon Luz|first version|
|1.1|13.10.2023|Simon Luz|fix difference between toc and headings|
|1.2|13.10.2023|Simon Luz|review CRS|
|1.3|13.10.2023|Simon Luz|add requirement for application type|
|1.4|12.04.2024|Tristan Kopp|removed wrong FR|

## Table of contents
1. [Scope](#scope)
2. [Introduction](#intro)
3. [Use Cases](#uc)
    - 3.1 [UC01: render nameplate with AAS data](#uc01)
    - 3.2 [UC02: render nameplate with reference to AAS data](#uc02)
4. [User Requirements](#requirements)
    - 4.1 [Functional Requirements](#fr)
        * 4.1.1 [FR.001 application type](#fr01)
        * 4.1.2 [FR.002 data for nameplate generation](#fr02)
        * 4.1.3 [FR.003 QR-code generator](#fr03)
        * 4.1.4 [FR.004 Nameplate generator](#fr04)
        * 4.1.5 [FR.005 Error handling](#fr05)
    - 4.2 [Non-functional Requirements](#nfr)
        * 4.2.1 [NFR.001 User-friendly](#nfr01)
        * 4.2.2 [NFR.002 Performance](#nfr02)
        * 4.2.3 [NFR.003 Reliability](#nfr03)
        * 4.2.4 [NFR.004 Maintainability](#nfr04)
        * 4.2.5 [NFR.005 License](#nfr05)

## 1 Scope <a name="scope"></a>

The objective of this document is to provide a detailed overview of the customer problem by outlining guidelines and requirements. Thus, setting the foundation of the project and creating a baseline of requirements for everyone involved in the project. Furthermore, it should specify the requirements for this software from a users and customers perspective, enabling the developing team to understand the idea and vision behind the product and are able to transform them into specific requirements for the final product.

## 2 Introduction <a name="intro"></a>

The main objective of this project is to create a nameplate generator for an Asset Administration Shell, also known as “AAS”. It shall be developed as a server application providing a machine readable Interface. Data input will be in the form of a well known format and should not need additional training for users of the product to understand the format. For the interface with the application, documentation for the applications interface shall be written in a both human and machine readable format. Additional documentation shall be provided in a human readable format, giving more detail on using the application.  The application shall be tested to ensure compatibility with a diverse AAS server infrastructure.
The purpose of creating digital nameplates is to make nameplates environment-friendly due to a paper free solution. Moreover, it provides access to customers everywhere since it is not physically bound to a specific place. Not to mention the virtually unlimited space that can be used to display the information in more detail in reference to multiple assets. Furthermore, the information is dynamic. Thus, it can easily be changed and modified if necessary. 
The nameplate generator is for customers that not only want to generate and print the type plates but also use it as a modern solution to provide a better service for their company as well as their own customers. It guarantees a simpler information collection process as well as unlimited access from any place. 

## 3 Use Cases <a name="usecase"></a>

## 3.1 UC01: render nameplate with AAS data <a name="uc01"></a>

|Use Case ID|UC01|
|----------------|-----------------------------|
|Description|The user wants a rendered nameplate for given AAS data. The user sends the data to the applications interface and receives a rendered nameplate|
|Involved roles|User, AAS-Server|
|System boundary|AAS-Server|
|Precondition|The server address is known. The user has prepared input data including AAS data and nameplate layout|
|Postcondition on success|The application renders the nameplate according to the input data and returns it to the user|
|Triggering event|the user calls the applications interface specific to rendering a nameplate with given AAS data|

## 3.2 UC02: render nameplate with reference to AAS data <a name="uc02"></a>

|Use Case ID|UC02|
|----------------|-----------------------------|
|Description|The user wants a rendered nameplate for a given reference to AAS data. The user sends the layout data for the nameplate and a reference to the AAS data to the application interface and receives a rendered nameplate|
|Involved roles|User, AAS-Server, external AAS storage|
|System boundary|AAS-Server, external AAS storage|
|Precondition|the user has defined the nameplate layout n the format needed bey the application and has a reference to the AAS data|
|Postcondition on success|The application loads the AAS data from the reference and renders the nameplate according to the input data and the referenced AAS data|
|Triggering event|the user calls the applications interface specific to rendering a nameplate with referencing AAS data|

## 4 Customer Requirements <a name="requirements"></a>

Requirements are described with ID and Overview, enabling the developing team to understand the requirements and fulfill them in their developing process.

## 4.1	Functional Requirements <a name="fr"></a>

## 4.1.1 FR.001 application type <a name="fr01"></a>

|Requirement ID|FR.001|
|----------------|-----------------------------|
|Overview|The application shall be developed as server application. It should be usable on all common OS. The application shall provide a machine readable interface.|
|Fit criterion|the application shall compile on Linux on windows. It shall run on Linux and Windows. The application interface should be testable with automated tests.|

## 4.1.2 FR.002 data source for nameplate generation <a name="fr02"></a>

|Requirement ID|FR.002|
|--------------|------|
|Overview|The application shall use AAS data for nameplate generation. The user shall be able to choose how AAS data is provided. It shall be possible to provide AAS data directly as input or provide a reference to AAS data. When a reference to AAS data is given, the application shall use the referenced AAS data for nameplate generation|
|Fit Criterion|Generated output shall not differ if AAS data is provided directly or via a reference. It shall contain only data from given AAS data|

## 4.1.3 FR.003 QR-code generator <a name="fr03"></a>

|Requirement ID|FR.003|
|----------------|-----------------------------|
|Overview|The application is able to generate QR-codes for the nameplates.|
|Fit Criterion| Generated QR-codes shall correspond to the DIN Standard and contain information in the following order: General Information, Technical Specification, Certificates and Patents.|

## 4.1.4 FR.004 Nameplate generator <a name="fr04"></a>

|Requirement ID|FR.004|
|----------------|-----------------------------|
|Overview|It can create nameplates for the chosen asset.|
|Fit criterion|Nameplates according to the DIN standard shall be generated out of the asset the user chose. It shall contain all the necessary information such as general Information, warning signs, certificates and a QR-code.|

## 4.1.5 FR.005 Error handling <a name="fr05"></a>

|Requirement ID|FR.005|
|----------------|-----------------------------|
|Overview|The system has sufficient error handling.|
|Fit Criterion|The application shall handle malformed input data gracefully. In case of malformed input data or other circumstances preventing the application to render a nameplate, it shall fail gracefully and return an appropriate error message to the user. It shall not stop working without a detailed error message.|

## 4.2	Non-functional Requirements <a name="nfr"></a>

## 4.2.1 NFR.001 User-friendly <a name="nfr01"></a>

|Requirement ID|NFR.001|
|----------------|-----------------------------|
|Overview|The application should be user-friendly, thus, a user with no experience with the interface shall be able to use it effortlessly.|
|Fit Criterion|An inexperienced user shall be able to understand the application interface in two minutes. the user shall be able to understand the layout format in less than 1 hour. Given a layout format and AAS data or a reference to AAS data, a user shall be able to request a nameplate in less than 10 Minutes|

## 4.2.2 NFR.002 Performance <a name="nfr02"></a>

|Requirement ID|NFR.002|
|----------------|-----------------------------|
|Overview|The software should maintain a high performance in terms of how data processing speed and nameplate generation. This also includes fetching AAS data from an external source if a reference is given|
|Fit Criterion|The standard request time will be no longer than 5 seconds. This time doesn't include network delay for both request and answer.|

## 4.2.3 NFR.003 Reliability <a name="nfr03"></a>

|Requirement ID|DNG.REL.003|
|----------------|-----------------------------|
|Overview|The application needs to be reliable in terms of containing the right information. |
|Fit Criterion|The nameplates and QR-codes have to be generated according to the DIN standard. The information must belong to the chosen asset meaning there shall not be a false exchange of data regarding different assets.|

## 4.2.4 NFR.004 Maintainability <a name="nfr04"></a>

|Requirement ID|NFR.003|
|----------------|-----------------------------|
|Overview|The application requires a high maintainability.|
|Fit Criterion|Each team member shall be able to read and understand the code as well as knowing how to make changes. Additionally, developers not belonging to the team shall be able to do so as well after reading the code for five hours. |

## 4.2.5 NFR.005 License <a name="nfr05"></a>

|Requirement ID|NFR.004|
|----------------|-----------------------------|
|Overview|The product is an open source software thus a license for publishing it is required.|
|Fit Criterion|The product shall published under a license approved by the Open Source Initiative and will be added to GitHub.|
