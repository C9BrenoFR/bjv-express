<?php

if (!class_exists('Roles')) {
    class Roles
    {
        public const ADMIN = '0';
        public const OPERATOR = '1';
        public const DELIVER = '2';
    }

}
if (!class_exists('Status')) {
    class Status
    {
        public const IN_SEPARATION = '0';
        public const ON_WAY = '1';
        public const DELIVERED = '2';
    }
}