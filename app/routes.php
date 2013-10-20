<?php
foreach (glob(dirname(__FILE__)."/routes/*.php") as $filename)
{
    include_once $filename;
}