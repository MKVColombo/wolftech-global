@REM ----------------------------------------------------------------------------
@REM Licensed to the Apache Software Foundation (ASF) under one
@REM or more contributor license agreements. See the NOTICE file
@REM distributed with this work for additional information.
@REM ----------------------------------------------------------------------------
@IF "%__MVNW_ARG0_NAME__%"=="" (SET __MVNW_ARG0_NAME__=%~nx0)
@SET __MVNW_CMD__=
@SET __MVNW_ERROR__=
@SET WRAPPER_VERSION=3.3.2
@SET WRAPPER_DISTRIBUTION_URL=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.9/apache-maven-3.9.9-bin.zip
@FOR /F "usebackq tokens=1* delims==" %%A IN ("%~dp0.mvn\wrapper\maven-wrapper.properties") DO @IF "%%A"=="distributionUrl" SET WRAPPER_DISTRIBUTION_URL=%%B
@SET MAVEN_HOME=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.9-bin\apache-maven-3.9.9
@IF EXIST "%MAVEN_HOME%\bin\mvn.cmd" GOTO runmvn
@ECHO Downloading Maven wrapper distribution...
@powershell -NoProfile -ExecutionPolicy Bypass -Command "$u='%WRAPPER_DISTRIBUTION_URL%';$z='%TEMP%\apache-maven-3.9.9.zip';Invoke-WebRequest -Uri $u -OutFile $z;New-Item -ItemType Directory -Force -Path '%MAVEN_HOME%\..'|Out-Null;Expand-Archive -Force $z '%MAVEN_HOME%\..';Remove-Item $z"
@IF ERRORLEVEL 1 GOTO error
:runmvn
@CALL "%MAVEN_HOME%\bin\mvn.cmd" %*
@SET MVNW_EXIT_CODE=%ERRORLEVEL%
@IF NOT "%MVNW_EXIT_CODE%"=="0" EXIT /B %MVNW_EXIT_CODE%
@GOTO end
:error
@ECHO Failed to install Maven wrapper distribution. 1>&2
@EXIT /B 1
:end
