<?php

if (!class_exists('Roles')) {
    class Roles
    {
        public const ADMIN = '0';
        public const OPERATOR = '1';
        public const DELIVER = '2';

        public static function translate($role)
        {
            if ($role == self::ADMIN)
                return "Administrador";
            else if ($role == self::OPERATOR)
                return "Operador";
            else if ($role == self::DELIVER)
                return "Entregador";
            return "SEM CARGO";
        }
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